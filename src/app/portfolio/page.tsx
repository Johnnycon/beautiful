"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import { portfolioItems } from "@/data/portfolio";
import { Instagram } from "lucide-react";

export default function PortfolioPage() {
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
              Our Work
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              Portfolio
            </h1>
            <p className="text-[#6B6560] text-lg leading-relaxed">
              Browse our collection of beautiful transformations—from stunning
              bridal looks to glamorous quinceañera styling. Each image tells a
              story of confidence and beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <PortfolioGrid items={portfolioItems} showFilters={true} />
        </div>
      </section>

      {/* Instagram CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center mx-auto mb-6">
              <Instagram size={28} className="text-white" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Follow Along on Instagram
            </h2>
            <p className="text-[#6B6560] text-lg mb-8 max-w-xl mx-auto">
              See more behind-the-scenes moments, styling tips, and the latest
              looks. Join our community of beauty lovers.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A962] transition-colors duration-300"
            >
              <Instagram size={20} />
              @beautifulinsideout
            </a>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#F5E6E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading
            eyebrow="Love What You See?"
            title="Book Your Beauty Experience"
            description="Let's create something beautiful together. Your special day deserves the perfect look."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book" variant="primary" size="lg">
              Book Now
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View Services
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
