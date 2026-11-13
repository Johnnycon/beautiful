"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { container } from "@/components/PageHeader";
import PlaceholderDot from "@/components/PlaceholderDot";

export interface WorkReelItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

const card = "w-[72vw] max-w-[19rem] shrink-0 snap-start sm:w-[19rem] lg:w-[21.5rem]";
const arrow =
  "flex size-12 items-center justify-center rounded-full border border-midnight/25 transition-colors hover:border-midnight hover:bg-midnight hover:text-pearl disabled:pointer-events-none disabled:opacity-30";

// A strip of tall photos that runs off the right edge of the page: swiped on
// phones, stepped with the arrows on desktop. The photos keep their portrait
// shape, so gowns aren't cropped to squares.
export default function WorkReel({
  heading,
  items,
  label,
  previousLabel,
  nextLabel,
  viewAllLabel,
}: {
  heading: ReactNode;
  items: WorkReelItem[];
  label: string;
  previousLabel: string;
  nextLabel: string;
  viewAllLabel: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () =>
      setEdges({
        atStart: strip.scrollLeft < 8,
        atEnd: strip.scrollLeft + strip.clientWidth > strip.scrollWidth - 8,
      });
    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const strip = stripRef.current;
    const list = listRef.current;
    const first = list?.firstElementChild;
    if (!strip || !list || !first) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({
      left: direction * 2 * (first.getBoundingClientRect().width + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div className={`${container} flex items-end justify-between gap-10`}>
        {heading}
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" onClick={() => step(-1)} disabled={edges.atStart} aria-label={previousLabel} className={arrow}>
            <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.atEnd} aria-label={nextLabel} className={arrow}>
            <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* The scroller is focusable so the strip can be moved with the arrow keys */}
      <div
        ref={stripRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="bleed-pad no-scrollbar mt-12 snap-x snap-mandatory overflow-x-auto pb-4 md:mt-16"
      >
        <ul ref={listRef} className="flex w-max gap-4 md:gap-6">
          {items.map((item, index) => (
            // Every other photo hangs a little lower, like frames on a wall
            <li key={item.id} className={`${card} md:even:pt-14`}>
              <figure>
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-crystal/40 ${index === 0 ? "rounded-t-full" : "rounded-[2px]"}`}
                >
                  <Image
                    src={item.src}
                    alt={`${item.title}: ${item.description}`}
                    fill
                    sizes="(max-width: 640px) 72vw, 22rem"
                    className="object-cover"
                  />
                  <PlaceholderDot src={item.src} />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-serif text-xl">{item.title}</span>
                  <span className="mt-0.5 block text-[0.9375rem] text-slate">{item.description}</span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li className={`${card} md:even:pt-14`}>
            <Link
              href="/portfolio"
              className="group flex aspect-[3/4] items-center justify-center rounded-t-full border border-midnight/25 px-8 text-center transition-colors hover:border-midnight hover:bg-midnight hover:text-pearl"
            >
              <span className="font-serif text-2xl underline decoration-rouge decoration-1 underline-offset-8 group-hover:decoration-petal">
                {viewAllLabel}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
