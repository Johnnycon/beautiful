"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { Star, Quote } from "lucide-react";

export default function ReviewsPage() {
  const averageRating =
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#C9A962] text-sm uppercase tracking-[0.2em] mb-4 block">
              Testimonials
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              What Our Clients Say
            </h1>
            <p className="text-[#6B6560] text-lg leading-relaxed mb-8">
              Real stories from real clients. Every review reflects our
              commitment to making you feel beautiful and confident on your
              special day.
            </p>

            {/* Rating Summary */}
            <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-sm">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="fill-[#C9A962] text-[#C9A962]"
                  />
                ))}
              </div>
              <div className="text-left">
                <span className="block text-2xl font-serif text-[#1A1A1A]">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-[#6B6560]">
                  {testimonials.length} reviews
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Review */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-[#1A1A1A] rounded-3xl p-8 md:p-12 text-center"
          >
            <Quote
              size={48}
              className="absolute top-8 left-8 text-[#C9A962] opacity-30"
            />
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-[#C9A962] text-[#C9A962]"
                />
              ))}
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl text-white mb-8 leading-relaxed">
              &ldquo;{testimonials[0].quote}&rdquo;
            </blockquote>
            <div>
              <p className="text-white font-medium">{testimonials[0].name}</p>
              <p className="text-[#A09A94]">
                {testimonials[0].eventType} • {testimonials[0].date}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="All Reviews"
            title="More Happy Clients"
            description="Browse all testimonials from brides, quinceañeras, and event guests."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#F5E6E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading
            eyebrow="Join Our Happy Clients"
            title="Ready to Experience the Difference?"
            description="Book your appointment today and become part of our growing family of satisfied clients."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book" variant="primary" size="lg">
              Book with Confidence
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
