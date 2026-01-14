"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import {
  MapPin,
  Instagram,
  Clock,
  Send,
  CheckCircle,
  Facebook,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-3xl text-[#1A1A1A] mb-8">
                {t("info.serviceArea")}
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Instagram size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      Instagram
                    </h3>
                    <a
                      href="https://instagram.com/lizbethbiso"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B6560] hover:text-[#C9A962] transition-colors"
                    >
                      @lizbethbiso
                    </a>
                    <p className="text-sm text-[#A09A94] mt-1">
                      DM us for quick questions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Facebook size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      Facebook
                    </h3>
                    <a
                      href="https://www.facebook.com/beautifulio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B6560] hover:text-[#C9A962] transition-colors"
                    >
                      @beautifulio
                    </a>
                    <p className="text-sm text-[#A09A94] mt-1">
                      Follow us for updates
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      {t("info.serviceArea")}
                    </h3>
                    <p className="text-[#6B6560]">
                      {t("info.serviceAreaValue")}
                    </p>
                    <p className="text-sm text-[#A09A94] mt-1">
                      {t("info.serviceAreaNote")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      {t("info.availability")}
                    </h3>
                    <p className="text-[#6B6560]">{t("info.availabilityValue")}</p>
                    <p className="text-sm text-[#A09A94] mt-1">
                      {t("info.availabilityNote")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {isSubmitted ? (
                <div className="bg-[#FAF8F5] rounded-2xl p-8 md:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A962] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
                    {t("form.successTitle")}
                  </h3>
                  <p className="text-[#6B6560] mb-6">
                    {t("form.successMessage")}
                  </p>
                  <Button href="/" variant="outline">
                    {t("form.backToHome")}
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#FAF8F5] rounded-2xl p-8 md:p-12"
                >
                  <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                    {t("form.title")}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        {t("form.name")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t("form.namePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          {t("form.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.emailPlaceholder")}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          {t("form.phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("form.phonePlaceholder")}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        {t("form.eventType")}
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                      >
                        <option value="">{t("form.eventTypePlaceholder")}</option>
                        <option value="wedding">{t("form.eventTypes.wedding")}</option>
                        <option value="quinceanera">{t("form.eventTypes.quinceanera")}</option>
                        <option value="sweet16">{t("form.eventTypes.sweet16")}</option>
                        <option value="prom">{t("form.eventTypes.prom")}</option>
                        <option value="corporate">{t("form.eventTypes.corporate")}</option>
                        <option value="photoshoot">{t("form.eventTypes.photoshoot")}</option>
                        <option value="other">{t("form.eventTypes.other")}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        {t("form.message")}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        placeholder={t("form.messagePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A962] transition-colors duration-300"
                    >
                      <Send size={18} />
                      {t("form.submit")}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <AnimatedSection className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#C9A962] text-sm uppercase tracking-[0.2em] mb-4 block">
              {t("faq.eyebrow")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
              {t("faq.title")}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: t("faq.questions.advance.q"),
                a: t("faq.questions.advance.a"),
              },
              {
                q: t("faq.questions.travel.q"),
                a: t("faq.questions.travel.a"),
              },
              {
                q: t("faq.questions.cancellation.q"),
                a: t("faq.questions.cancellation.a"),
              },
              {
                q: t("faq.questions.trials.q"),
                a: t("faq.questions.trials.a"),
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="font-medium text-[#1A1A1A] mb-2">{faq.q}</h3>
                <p className="text-[#6B6560] text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-[#A09A94] text-lg mb-10 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <Button href="/book" variant="secondary" size="lg">
            {tCommon("bookNow")}
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
}
