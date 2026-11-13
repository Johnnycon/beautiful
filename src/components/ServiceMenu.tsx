"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PlaceholderDot from "@/components/PlaceholderDot";

export interface ServiceMenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

// The home page's service list. Beside it stands an arched "mirror" that shows
// the service being pointed at or focused; on phones each row carries its own
// small arch instead.
export default function ServiceMenu({ intro, items }: { intro: ReactNode; items: ServiceMenuItem[] }) {
  const [activeId, setActiveId] = useState(items[0].id);

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-x-8">
      <div className="md:col-span-5 lg:col-span-4">
        <div className="md:sticky md:top-28">
          {intro}
          <div aria-hidden className="relative mt-12 hidden w-full max-w-[21rem] md:block">
            {/* Fine outer rule, like the mirror's frame */}
            <div className="absolute -inset-2.5 rounded-t-full border border-crystal" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-crystal/40">
              {items.map((item) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt=""
                  fill
                  sizes="21rem"
                  className={`object-cover transition-opacity duration-500 ease-out ${
                    item.id === activeId ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <PlaceholderDot src={items.find((item) => item.id === activeId)!.image} />
            </div>
          </div>
        </div>
      </div>

      <ul className="border-t border-midnight md:col-span-7 lg:col-start-6">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="border-b border-crystal">
              <Link
                href={`/services#${item.id}`}
                onPointerEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                className="group grid grid-cols-[auto_1fr] items-center gap-x-5 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-x-8 md:py-7"
              >
                <span className="relative block aspect-[3/4] w-14 overflow-hidden rounded-t-full bg-crystal/40 md:hidden">
                  <Image src={item.image} alt="" fill sizes="3.5rem" className="object-cover" />
                </span>
                <span className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 md:contents">
                  <span
                    className={`font-serif text-[1.375rem] leading-tight transition-colors duration-200 group-hover:text-rouge md:text-[1.875rem] ${
                      isActive ? "md:text-rouge" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="font-serif text-lg whitespace-nowrap tabular-nums md:text-xl">{item.price}</span>
                  <span className="col-span-2 mt-1.5 block max-w-xl text-[0.9375rem] text-slate md:mt-2 md:text-base">
                    {item.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
