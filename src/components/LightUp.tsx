"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Marks its children as lit (`data-lit`) the first time they scroll into view,
// so a row of bulbs can switch on in sequence with CSS, the way the hero
// mirror does on load. Style descendants with `group-data-lit:…`.
export default function LightUp({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsLit(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-lit={isLit || undefined} className={`group ${className}`}>
      {children}
    </div>
  );
}
