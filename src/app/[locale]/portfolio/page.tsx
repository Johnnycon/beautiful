"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import { portfolioItems } from "@/data/portfolio";
import { Instagram } from "lucide-react";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const tCommon = useTranslations("common");
  const tInstagram = useTranslations("data.instagram");

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
              {t("hero.eyebrow")}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#6B6560] text-lg leading-relaxed">
              {t("hero.description")}
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
              {tInstagram("title")}
            </h2>
            <p className="text-[#6B6560] text-lg mb-8 max-w-xl mx-auto">
              {tInstagram("description")}
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
            eyebrow={t("cta.title")}
            title={t("cta.description")}
            description=""
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book" variant="primary" size="lg">
              {t("cta.button")}
            </Button>
            <Button href="/services" variant="outline" size="lg">
              {tCommon("viewAll")}
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
