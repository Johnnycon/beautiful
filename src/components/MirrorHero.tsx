import Image from "next/image";

// Geometry of the mirror frame in its own 300×400 coordinate space: a
// semicircular top (radius 150) over straight sides. Bulbs sit just outside it.
const W = 300;
const H = 400;
const R = W / 2;
const OFFSET = 24;

const leftSide = [370, 310, 250, 190].map((y) => ({ x: -OFFSET, y }));
const arch = Array.from({ length: 9 }, (_, i) => {
  const angle = Math.PI * (1 - i / 8);
  return {
    x: R + (R + OFFSET) * Math.cos(angle),
    y: R - (R + OFFSET) * Math.sin(angle),
  };
});
const rightSide = [190, 250, 310, 370].map((y) => ({ x: W + OFFSET, y }));

// Ordered so the bulbs light up one by one, up the left, over the top, down the right
const bulbs = [...leftSide, ...arch, ...rightSide];
const FIRST_BULB_DELAY = 400;
const BULB_STEP = 70;
const ALL_LIT = FIRST_BULB_DELAY + BULB_STEP * bulbs.length;

export default function MirrorHero({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full">
      {/* Light from the bulbs falling on the wall behind the mirror */}
      <div
        aria-hidden
        className="absolute -inset-[20%] animate-mirror-glow rounded-full bg-[radial-gradient(closest-side,rgb(255_231_184/0.14),transparent)]"
        style={{ animationDelay: `${ALL_LIT - 600}ms` }}
      />

      {/* Frame */}
      <div className="absolute inset-0 rounded-t-full border border-crystal/40 p-2.5">
        <div className="relative h-full overflow-hidden rounded-t-full">
          <Image
            src={src}
            alt={alt}
            fill
            preload
            sizes="(max-width: 768px) 70vw, 34vw"
            className="animate-mirror-light object-cover"
            style={{ animationDelay: `${ALL_LIT - 900}ms` }}
          />
        </div>
      </div>

      {/* Bulbs */}
      <div aria-hidden>
        {bulbs.map((bulb, i) => (
          <span
            key={i}
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 animate-bulb-on rounded-full md:size-3"
            style={{
              left: `${(bulb.x / W) * 100}%`,
              top: `${(bulb.y / H) * 100}%`,
              animationDelay: `${FIRST_BULB_DELAY + i * BULB_STEP}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
