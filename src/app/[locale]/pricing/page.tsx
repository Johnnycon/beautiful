"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import {
  pricingPackages,
  addOns,
} from "@/data/pricing";
import { CheckCircle, MapPin, CreditCard, Calendar, Star } from "lucide-react";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tData = useTranslations("data.pricing");
  const tCommon = useTranslations("common");

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

      {/* Pricing Packages */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  pkg.popular
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-[#FAF8F5]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 bg-[#C9A962] text-white text-xs uppercase tracking-wider rounded-full">
                      <Star size={12} className="fill-current" /> {t("popular")}
                    </span>
                  </div>
                )}

                <h3
                  className={`font-serif text-2xl mb-2 ${
                    pkg.popular ? "text-white" : "text-[#1A1A1A]"
                  }`}
                >
                  {tData(`packages.${pkg.id}.name`)}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    pkg.popular ? "text-white/70" : "text-[#6B6560]"
                  }`}
                >
                  {tData(`packages.${pkg.id}.description`)}
                </p>

                <div className="mb-6">
                  <span
                    className={`text-4xl font-serif ${
                      pkg.popular ? "text-[#C9A962]" : "text-[#1A1A1A]"
                    }`}
                  >
                    ${pkg.price}
                  </span>
                  <span
                    className={`text-sm ${
                      pkg.popular ? "text-white/70" : "text-[#A09A94]"
                    }`}
                  >
                    {pkg.priceType === "starting" ? ` ${tData("starting")}` : ""}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((_, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className={`flex-shrink-0 mt-0.5 ${
                          pkg.popular ? "text-[#C9A962]" : "text-[#C9A962]"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          pkg.popular ? "text-white/90" : "text-[#6B6560]"
                        }`}
                      >
                        {tData(`packages.${pkg.id}.features.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`text-xs mb-6 ${
                    pkg.popular ? "text-white/50" : "text-[#A09A94]"
                  }`}
                >
                  {tData(`packages.${pkg.id}.idealFor`)}
                </p>

                <Button
                  href="/book"
                  variant={pkg.popular ? "secondary" : "primary"}
                  className="w-full"
                >
                  {tCommon("bookNow")}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <AnimatedSection className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            eyebrow={t("addOns.title")}
            title={t("addOns.description")}
            description=""
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium text-[#1A1A1A] mb-1">
                    {tData(`addOns.${index}.name`)}
                  </h4>
                  <p className="text-sm text-[#6B6560]">{tData(`addOns.${index}.description`)}</p>
                </div>
                <span className="text-[#C9A962] font-medium whitespace-nowrap ml-4">
                  +${addon.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Policies */}
      <section id="policies" className="py-20 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            eyebrow={t("policies.title")}
            title={t("policies.description")}
            description=""
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Travel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#FAF8F5] rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9A962] flex items-center justify-center mb-6">
                <MapPin size={24} className="text-white" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">
                {tData("policies.travel.title")}
              </h3>
              <p className="text-[#6B6560] text-sm leading-relaxed">
                {tData("policies.travel.description")}
              </p>
            </motion.div>

            {/* Deposit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#FAF8F5] rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9A962] flex items-center justify-center mb-6">
                <CreditCard size={24} className="text-white" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">
                {tData("policies.deposit.title")}
              </h3>
              <p className="text-[#6B6560] text-sm leading-relaxed">
                {tData("policies.deposit.description")}
              </p>
            </motion.div>

            {/* Cancellation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FAF8F5] rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9A962] flex items-center justify-center mb-6">
                <Calendar size={24} className="text-white" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">
                {tData("policies.cancellation.title")}
              </h3>
              <p className="text-[#6B6560] text-sm leading-relaxed">
                {tData("policies.cancellation.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading
            eyebrow={t("cta.title")}
            title={t("cta.description")}
            description=""
            light
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book" variant="secondary" size="lg">
              {t("cta.button")}
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#1A1A1A]"
            >
              {tCommon("contactUs")}
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
