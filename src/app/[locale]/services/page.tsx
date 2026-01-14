"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import { services } from "@/data/services";
import {
  Crown,
  Sparkles,
  Heart,
  Wind,
  Sun,
  Star,
  Users,
  Clock,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  crown: Crown,
  sparkles: Sparkles,
  heart: Heart,
  wind: Wind,
  sun: Sun,
  star: Star,
  users: Users,
};

// Service images - real images where available, Unsplash placeholders for others
const serviceImages = [
  "/images/gallery/gallery_12.JPG", // Bridal - crystal headpiece updo
  "/images/gallery/gallery_2.JPG",  // Quinceañera - blue ball gown
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", // Sweet 16 - placeholder
  "/images/gallery/gallery_1.JPG",  // Hair Styling - textured updo
  "/images/gallery/gallery_5.JPG",  // Natural - natural glam portrait
  "/images/gallery/gallery_10.JPG", // Glam - soft glam makeup
  "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&q=80", // Group - placeholder
];

export default function ServicesPage() {
  const t = useTranslations("services");
  const tData = useTranslations("data.services");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#FAF8F5] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <Image
            src="/images/gallery/gallery_10.JPG"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
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

      {/* Services List */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Star;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative ${isEven ? "" : "lg:col-start-2"}`}
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src={serviceImages[index] || serviceImages[serviceImages.length - 1]}
                        alt={tData(`${service.id}.title`)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-[#C9A962] rounded-full flex items-center justify-center text-white">
                      <Icon size={32} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                      {tData(`${service.id}.title`)}
                    </h2>
                    <p className="text-[#6B6560] text-lg leading-relaxed mb-6">
                      {tData(`${service.id}.description`)}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-[#6B6560]">
                        <Clock size={18} className="text-[#C9A962]" />
                        <span>{tData(`${service.id}.duration`)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6B6560]">
                        <span className="text-[#C9A962] font-medium">
                          {t("startingAt")} ${service.startingPrice}
                        </span>
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-8">
                      <h4 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                        {t("includes")}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.includes.map((_, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[#6B6560]"
                          >
                            <CheckCircle
                              size={18}
                              className="text-[#C9A962] flex-shrink-0 mt-0.5"
                            />
                            <span>{tData(`${service.id}.includes.${i}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Add-ons */}
                    {service.addOns && service.addOns.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                          {t("addOns")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.addOns.map((addon, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-[#FAF8F5] rounded-full text-sm text-[#6B6560]"
                            >
                              {tData(`${service.id}.addOns.${i}.name`)} +${addon.price}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button href="/book" variant="primary">
                      {t("bookService")}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              {tCommon("bookNow")}
            </Button>
            <Button
              href="/pricing"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#1A1A1A]"
            >
              {t("cta.button")}
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
