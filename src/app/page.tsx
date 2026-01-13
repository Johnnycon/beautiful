"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import PortfolioGrid from "@/components/PortfolioGrid";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
            alt="Luxury beauty styling"
            fill
            className="object-cover"
            priority
          />
          {/* Main overlay for content readability */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Gradient for left-side content emphasis */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          {/* Top gradient for navigation visibility */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-[#E8D5A3] text-sm uppercase tracking-[0.2em] mb-6"
            >
              <Sparkles size={16} />
              Luxury Mobile Beauty
            </motion.span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
              Camera-ready glam for life&apos;s{" "}
              <span className="text-[#C9A962]">biggest days</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              On-site hair and makeup styling with a calm, premium experience—from
              first brush to final touch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button href="/book" variant="secondary" size="lg">
                Book Your Date
              </Button>
              <Button href="/portfolio" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#1A1A1A]">
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <AnimatedSection className="py-12 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-[#A09A94]">
            <span className="text-sm uppercase tracking-wider">
              Trusted for Weddings
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-[#C9A962]" />
            <span className="text-sm uppercase tracking-wider">
              Quinceañeras
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-[#C9A962]" />
            <span className="text-sm uppercase tracking-wider">
              High-Profile Events
            </span>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Our Services"
            title="Signature Beauty Services"
            description="From bridal elegance to quinceañera glam, we bring luxury styling wherever your moment happens."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                href={`/services#${service.id}`}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button href="/services" variant="outline">
              View All Services
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Portfolio Preview */}
      <AnimatedSection className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Our Work"
            title="The Work Speaks for Itself"
            description="Browse our portfolio of beautiful transformations for weddings, quinceañeras, and special events."
          />

          <PortfolioGrid items={portfolioItems} limit={8} showFilters={false} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button href="/portfolio" variant="primary">
              See Full Portfolio
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection className="py-20 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="How It Works"
            title="Booking Made Simple"
            description="Three easy steps to secure your perfect beauty experience."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Service",
                description:
                  "Select from our signature services—bridal, quinceañera, event glam, or group booking.",
              },
              {
                step: "02",
                title: "Pick Date & Location",
                description:
                  "Tell us when and where. We come to you—home, venue, hotel, wherever you need us.",
              },
              {
                step: "03",
                title: "Confirm & Relax",
                description:
                  "Secure your spot with a deposit. We handle the rest so you can focus on your moment.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A962] text-white font-serif text-2xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-white font-serif text-2xl mb-4">
                  {item.title}
                </h3>
                <p className="text-[#A09A94] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            <Button href="/book" variant="secondary" size="lg">
              Check Availability
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Reviews"
            title="What Our Clients Say"
            description="Real stories from brides, quinceañeras, and event guests who trusted us with their special moments."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button href="/reviews" variant="outline">
              Read More Reviews
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* About Preview */}
      <AnimatedSection className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
                  alt="Professional makeup artist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C9A962] rounded-full flex items-center justify-center text-white font-serif text-center p-4">
                <span>
                  10+ Years Experience
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#C9A962] text-sm uppercase tracking-[0.2em] mb-4 block">
                About
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                Beauty with a Personal Touch
              </h2>
              <p className="text-[#6B6560] text-lg leading-relaxed mb-6">
                I believe every special moment deserves beauty that feels both
                luxurious and effortless. With over a decade of experience in
                bridal and special event styling, I bring calm professionalism,
                meticulous attention to detail, and a genuine passion for making
                you feel your absolute best.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Licensed and certified professional",
                  "Premium, hygienic product selection",
                  "Punctual and reliable service",
                  "Calm, stress-free experience",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#6B6560]">
                    <CheckCircle className="w-5 h-5 text-[#C9A962] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#C9A962] font-medium hover:gap-3 transition-all duration-300"
              >
                Meet Your Stylist <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#F5E6E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C9A962] text-sm uppercase tracking-[0.2em] mb-4 block">
              Ready to Begin?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
              Your date deserves perfect beauty
            </h2>
            <p className="text-[#6B6560] text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s create something beautiful together. Book your
              consultation today and secure your spot for your special day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/book" variant="primary" size="lg">
                Book Now
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Questions? Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
