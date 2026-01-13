"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  alignment = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-sm uppercase tracking-[0.2em] mb-4 ${
            light ? "text-[#E8D5A3]" : "text-[#C9A962]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl mb-4 ${
          light ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl ${
            alignment === "center" ? "mx-auto" : ""
          } ${light ? "text-[#A09A94]" : "text-[#6B6560]"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
