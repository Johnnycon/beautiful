"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PortfolioCategory, PortfolioItem } from "@/data/portfolio";
import { portfolioCategories } from "@/data/portfolio";
import PlaceholderDot from "@/components/PlaceholderDot";

export type TranslatedPortfolioItem = PortfolioItem & {
  title: string;
  description: string;
};

export default function PortfolioGrid({ items }: { items: TranslatedPortfolioItem[] }) {
  const t = useTranslations("portfolio.filters");
  const tCommon = useTranslations("common");
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const visibleItems =
    activeFilter === "all" ? items : items.filter((item) => item.category === activeFilter);
  const selectedItem = visibleItems.find((item) => item.id === selectedId);

  const step = useCallback(
    (direction: 1 | -1) => {
      setSelectedId((current) => {
        const index = visibleItems.findIndex((item) => item.id === current);
        if (index === -1) return current;
        return visibleItems[(index + direction + visibleItems.length) % visibleItems.length].id;
      });
    },
    [visibleItems]
  );

  // Keyboard support and scroll lock while the lightbox is open
  useEffect(() => {
    if (selectedId === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedId, step]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-crystal pb-4">
        {(["all", ...portfolioCategories] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            aria-pressed={activeFilter === category}
            className={`text-[0.9375rem] decoration-1 underline-offset-[10px] transition-colors ${
              activeFilter === category
                ? "underline decoration-rouge"
                : "text-slate hover:text-midnight"
            }`}
          >
            {t(category)}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item, index) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/5] overflow-hidden bg-crystal/30">
                  <Image
                    src={item.imageUrl}
                    alt={`${item.title}: ${item.description}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    preload={index < 3}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <PlaceholderDot src={item.imageUrl} />
                </span>
                <span className="mt-3 block font-serif text-lg md:text-xl">{item.title}</span>
                <span className="block text-sm text-slate">{item.description}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            className="fixed inset-0 z-[60] grid grid-rows-[auto_1fr_auto] bg-midnight/97 text-pearl"
            onClick={() => setSelectedId(null)}
          >
            <div className="flex justify-end p-4">
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedId(null)}
                className="p-2 text-pearl/80 hover:text-pearl"
                aria-label={tCommon("close")}
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative mx-4 md:mx-24" onClick={(e) => e.stopPropagation()}>
              <Image
                key={selectedItem.id}
                src={selectedItem.imageUrl}
                alt={`${selectedItem.title}: ${selectedItem.description}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div
              className="flex items-center justify-between gap-6 px-4 py-6 md:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                className="p-2 text-pearl/80 hover:text-pearl"
                aria-label={tCommon("previous")}
              >
                <ChevronLeft size={32} strokeWidth={1.25} />
              </button>
              <div className="text-center">
                <p className="font-serif text-2xl">{selectedItem.title}</p>
                <p className="text-sm text-mist">{selectedItem.description}</p>
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                className="p-2 text-pearl/80 hover:text-pearl"
                aria-label={tCommon("next")}
              >
                <ChevronRight size={32} strokeWidth={1.25} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
