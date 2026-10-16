"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

// Geometry of the mirror in its own 300×400 coordinate space: a semicircular
// top (radius 150) over straight sides, with a frame band BAND units wide.
// Bulbs are mounted along the middle of the band.
const W = 300;
const H = 400;
const R = W / 2;
const BAND = 16;
const BULB_RADIUS = R - BAND / 2;
const BULB_STEP_Y = (Math.PI * BULB_RADIUS) / 8; // same spacing as the arch bulbs

const sideYs = [1, 2, 3, 4].map((n) => R + n * BULB_STEP_Y);
const leftSide = [...sideYs].reverse().map((y) => ({ x: BAND / 2, y }));
const arch = Array.from({ length: 9 }, (_, i) => {
  const angle = Math.PI * (1 - i / 8);
  return {
    x: R + BULB_RADIUS * Math.cos(angle),
    y: R - BULB_RADIUS * Math.sin(angle),
  };
});
const rightSide = sideYs.map((y) => ({ x: W - BAND / 2, y }));

// Ordered so the bulbs light up one by one, up the left, over the top, down the right
const bulbs = [...leftSide, ...arch, ...rightSide];
const FIRST_BULB_DELAY = 400;
const BULB_STEP = 70;
const ALL_LIT = FIRST_BULB_DELAY + BULB_STEP * bulbs.length;

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

// Each client "sits down" at the mirror for a while, then the next one fades in
const REFLECTION_MS = 6500;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export interface Reflection {
  src: string;
  alt: string;
  label: string;
}

interface MirrorHeroProps {
  reflections: Reflection[];
  pauseLabel: string;
  playLabel: string;
}

export default function MirrorHero({ reflections, pauseLabel, playLabel }: MirrorHeroProps) {
  const [active, setActive] = useState(0);
  // null until the visitor plays or pauses; until then it rotates unless they prefer reduced motion
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true
  );
  const isRotating = playing ?? !prefersReducedMotion;

  useEffect(() => {
    if (!isRotating || isHovered) return;
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % reflections.length),
      REFLECTION_MS
    );
    return () => clearTimeout(timer);
  }, [active, isRotating, isHovered, reflections.length]);

  return (
    <div>
      {/* Hovering the mirror holds the current reflection */}
      <div
        className="relative mx-auto aspect-[3/4] w-full"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Light from the bulbs falling on the wall behind the mirror */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[20%] animate-mirror-glow rounded-full bg-[radial-gradient(closest-side,rgb(255_231_184/0.14),transparent)]"
          style={{ animationDelay: `${ALL_LIT - 600}ms` }}
        />

        {/* Frame: a lacquered band with a fine rule on both edges. Padding
            percentages resolve against the width, so the band scales with it. */}
        <div
          className="absolute inset-0 rounded-t-full bg-linear-to-b from-midnight-soft to-midnight shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-crystal/30"
          style={{ padding: pct(BAND, W) }}
        >
          {/* Glass */}
          <div className="relative h-full overflow-hidden rounded-t-full ring-1 ring-crystal/40">
            <div
              className="absolute inset-0 animate-mirror-light"
              style={{ animationDelay: `${ALL_LIT - 900}ms` }}
            >
              {reflections.map((reflection, i) => (
                <Image
                  key={reflection.src}
                  src={reflection.src}
                  alt={reflection.alt}
                  aria-hidden={i !== active}
                  fill
                  preload={i === 0}
                  sizes="(max-width: 768px) 66vw, 28rem"
                  className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            {/* Warm spill from the bulbs around the edge of the glass */}
            <div
              aria-hidden
              className="absolute inset-0 animate-mirror-glow rounded-t-full shadow-[inset_0_0_48px_6px_rgb(255_231_184/0.16)]"
              style={{ animationDelay: `${ALL_LIT - 600}ms` }}
            />
          </div>
        </div>

        {/* Bulbs, each seated in a socket on the band */}
        <div aria-hidden>
          {bulbs.map((bulb, i) => (
            <span
              key={i}
              className="absolute grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-midnight ring-1 ring-crystal/25 md:size-[1.125rem]"
              style={{ left: pct(bulb.x, W), top: pct(bulb.y, H) }}
            >
              <span
                className="size-2.5 animate-bulb-on rounded-full md:size-3"
                style={{ animationDelay: `${FIRST_BULB_DELAY + i * BULB_STEP}ms` }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Named reflections instead of dots: the labels also say who the mirror is for */}
      <div className="mt-6 flex items-center justify-center gap-6 text-[0.9375rem]">
        {reflections.map((reflection, i) => (
          <button
            key={reflection.src}
            type="button"
            aria-pressed={i === active}
            onClick={() => {
              setActive(i);
              setPlaying(false);
            }}
            className={`underline-offset-[6px] decoration-1 transition-colors ${
              i === active ? "text-pearl underline decoration-rouge" : "text-mist hover:text-pearl"
            }`}
          >
            {reflection.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPlaying(!isRotating)}
          aria-label={isRotating ? pauseLabel : playLabel}
          className="border-l border-pearl/20 py-1 pl-6 text-mist transition-colors hover:text-pearl"
        >
          {isRotating ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  );
}
