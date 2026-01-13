"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 shadow-sm h-full flex flex-col"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-[#C9A962] text-[#C9A962]"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-[#6B6560] leading-relaxed flex-grow mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-[#FAF8F5]">
        <div>
          <p className="font-medium text-[#1A1A1A]">{testimonial.name}</p>
          <p className="text-sm text-[#A09A94]">{testimonial.date}</p>
        </div>
        <span className="px-3 py-1 bg-[#FAF8F5] rounded-full text-xs text-[#C9A962] font-medium">
          {testimonial.eventType}
        </span>
      </div>
    </motion.div>
  );
}
