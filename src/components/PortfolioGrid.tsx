"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem, PortfolioCategory } from "@/data/portfolio";
import { portfolioCategories } from "@/data/portfolio";

interface PortfolioGridProps {
  items: PortfolioItem[];
  showFilters?: boolean;
  limit?: number;
}

export default function PortfolioGrid({
  items,
  showFilters = true,
  limit,
}: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "all">(
    "all"
  );
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handlePrevious = () => {
    if (selectedImage === null) return;
    const currentIndex = displayItems.findIndex(
      (item) => item.id === selectedImage
    );
    const prevIndex =
      currentIndex === 0 ? displayItems.length - 1 : currentIndex - 1;
    setSelectedImage(displayItems[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = displayItems.findIndex(
      (item) => item.id === selectedImage
    );
    const nextIndex =
      currentIndex === displayItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(displayItems[nextIndex].id);
  };

  const selectedItem = displayItems.find((item) => item.id === selectedImage);

  return (
    <>
      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-[#1A1A1A] text-white"
                : "bg-[#FAF8F5] text-[#6B6560] hover:bg-[#F5E6E0]"
            }`}
          >
            All
          </button>
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                activeFilter === cat.id
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-[#FAF8F5] text-[#6B6560] hover:bg-[#F5E6E0]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Grid - Mathematically verified layout:
          Desktop (4 cols): 8 items = 12 cells (3 rows) - item 0 is 2×2, item 6 is 2×1
          Tablet (3 cols): 6 items = 9 cells (3 rows) - item 0 is 2×2
          Mobile (2 cols): 4 items = 4 cells (2 rows) - all 1×1
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px] grid-flow-dense">
        <AnimatePresence mode="popLayout">
          {displayItems.map((item, index) => {
            // Position-based responsive classes for mathematically perfect tiling
            const isFirstItem = index === 0;
            const isSeventhItem = index === 6;
            const isHiddenOnMobile = index >= 4 && index < 6; // Items 5-6 hidden on mobile
            const isHiddenUntilDesktop = index >= 6; // Items 7-8 hidden until desktop

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`
                  relative overflow-hidden rounded-xl cursor-pointer group
                  ${isFirstItem ? "md:col-span-2 md:row-span-2" : ""}
                  ${isSeventhItem ? "lg:col-span-2" : ""}
                  ${isHiddenOnMobile ? "hidden md:block" : ""}
                  ${isHiddenUntilDesktop ? "hidden lg:block" : ""}
                `}
                onClick={() => setSelectedImage(item.id)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={isFirstItem ? "(max-width: 768px) 50vw, 50vw" : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-serif text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-2xl mb-1">
                  {selectedItem.title}
                </h3>
                <p className="text-white/80">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
