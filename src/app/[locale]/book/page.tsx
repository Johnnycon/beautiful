"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import { services } from "@/data/services";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

type FormStep = 1 | 2 | 3 | 4;

interface FormData {
  service: string;
  date: string;
  time: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  partySize: string;
  notes: string;
}

export default function BookingPage() {
  const t = useTranslations("book");
  const tServices = useTranslations("data.services");

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    date: "",
    time: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    partySize: "1",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormStep);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormStep);
  };

  const steps = [
    { number: 1, label: t("steps.services") },
    { number: 2, label: t("steps.event") },
    { number: 3, label: t("steps.contact") },
    { number: 4, label: t("steps.review") },
  ];

  if (isSubmitted) {
    return (
      <section className="min-h-screen pt-32 pb-20 bg-[#FAF8F5] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 rounded-full bg-[#C9A962] flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-6">
              {t("success.title")}
            </h1>
            <p className="text-[#6B6560] text-lg mb-8">
              {t("success.description")}
            </p>
            <div className="bg-white rounded-2xl p-8 mb-8 text-left">
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">
                {t("success.nextSteps")}
              </h3>
              <ul className="space-y-3 text-[#6B6560]">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-sm text-[#C9A962] flex-shrink-0">
                    1
                  </span>
                  {t("success.step1")}
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-sm text-[#C9A962] flex-shrink-0">
                    2
                  </span>
                  {t("success.step2")}
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-sm text-[#C9A962] flex-shrink-0">
                    3
                  </span>
                  {t("success.step3")}
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-sm text-[#C9A962] flex-shrink-0">
                    4
                  </span>
                  {t("success.step4")}
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A962] transition-colors duration-300"
              >
                {t("success.backToHome")}
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
              >
                {t("success.viewPortfolio")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-[#FAF8F5]">
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

      {/* Progress Steps */}
      <section className="py-8 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentStep >= step.number
                      ? "bg-[#C9A962] text-white"
                      : "bg-white text-[#A09A94]"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle size={20} />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`hidden sm:block ml-2 text-sm ${
                    currentStep >= step.number
                      ? "text-[#1A1A1A]"
                      : "text-[#A09A94]"
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-2 transition-colors duration-300 ${
                      currentStep > step.number ? "bg-[#C9A962]" : "bg-white"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                      {t("form.selectServices")}
                    </h2>
                    <div className="space-y-3">
                      {services.map((service) => (
                        <label
                          key={service.id}
                          className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            formData.service === service.id
                              ? "bg-[#FAF8F5] border-2 border-[#C9A962]"
                              : "bg-[#FAF8F5] border-2 border-transparent hover:border-[#E8D5A3]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={formData.service === service.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.service === service.id
                                ? "border-[#C9A962]"
                                : "border-[#A09A94]"
                            }`}
                          >
                            {formData.service === service.id && (
                              <div className="w-3 h-3 rounded-full bg-[#C9A962]" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-[#1A1A1A]">
                              {tServices(`${service.id}.title`)}
                            </p>
                            <p className="text-sm text-[#6B6560]">
                              {t("form.startingAt")} ${service.startingPrice}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                      {t("steps.event")}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <Calendar size={18} className="text-[#C9A962]" />
                          {t("form.eventDate")}
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <Clock size={18} className="text-[#C9A962]" />
                          {t("form.eventTime")}
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                        >
                          <option value="">{t("form.selectTime")}</option>
                          <option value="5:00 AM">5:00 AM</option>
                          <option value="6:00 AM">6:00 AM</option>
                          <option value="7:00 AM">7:00 AM</option>
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <MapPin size={18} className="text-[#C9A962]" />
                          {t("form.location")}
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder={t("form.locationPlaceholder")}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <Users size={18} className="text-[#C9A962]" />
                          {t("form.partySize")}
                        </label>
                        <select
                          name="partySize"
                          value={formData.partySize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? t("form.person") : t("form.people")}
                            </option>
                          ))}
                          <option value="10+">10+ {t("form.people")}</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                      {t("steps.contact")}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <User size={18} className="text-[#C9A962]" />
                          {t("form.name")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("form.namePlaceholder")}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <Mail size={18} className="text-[#C9A962]" />
                          {t("form.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("form.emailPlaceholder")}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <Phone size={18} className="text-[#C9A962]" />
                          {t("form.phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("form.phonePlaceholder")}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] mb-2">
                          <FileText size={18} className="text-[#C9A962]" />
                          {t("form.notes")}
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder={t("form.notesPlaceholder")}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                      {t("form.review.title")}
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-[#FAF8F5] rounded-xl p-6">
                        <h3 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                          {t("form.review.selectedServices")}
                        </h3>
                        <p className="text-[#1A1A1A] font-medium">
                          {formData.service ? tServices(`${formData.service}.title`) : t("form.notSelected")}
                        </p>
                      </div>
                      <div className="bg-[#FAF8F5] rounded-xl p-6">
                        <h3 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                          {t("form.review.eventDetails")}
                        </h3>
                        <p className="text-[#1A1A1A]">
                          {formData.date
                            ? new Date(formData.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : t("form.notSelected")}
                        </p>
                        <p className="text-[#6B6560]">
                          {formData.time || t("form.timeNotSelected")}
                        </p>
                      </div>
                      <div className="bg-[#FAF8F5] rounded-xl p-6">
                        <h3 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                          {t("form.location")}
                        </h3>
                        <p className="text-[#1A1A1A]">
                          {formData.location || t("form.notProvided")}
                        </p>
                        <p className="text-[#6B6560]">
                          {t("form.partySize")}: {formData.partySize}
                        </p>
                      </div>
                      <div className="bg-[#FAF8F5] rounded-xl p-6">
                        <h3 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                          {t("form.review.contactInfo")}
                        </h3>
                        <p className="text-[#1A1A1A] font-medium">
                          {formData.name}
                        </p>
                        <p className="text-[#6B6560]">{formData.email}</p>
                        <p className="text-[#6B6560]">{formData.phone}</p>
                      </div>
                      {formData.notes && (
                        <div className="bg-[#FAF8F5] rounded-xl p-6">
                          <h3 className="text-sm uppercase tracking-wider text-[#A09A94] mb-4">
                            {t("form.review.notes")}
                          </h3>
                          <p className="text-[#6B6560]">{formData.notes}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-[#FAF8F5]">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
                  >
                    <ArrowLeft size={18} />
                    {t("form.back")}
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 1 && !formData.service}
                    className="flex items-center gap-2 px-8 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A962] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("form.next")}
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <Button type="submit" variant="secondary" size="lg">
                    {t("form.submit")}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-[#C9A962]" />
              </div>
              <h3 className="font-medium text-[#1A1A1A] mb-2">
                {t("info.quickResponse.title")}
              </h3>
              <p className="text-sm text-[#6B6560]">
                {t("info.quickResponse.description")}
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-[#C9A962]" />
              </div>
              <h3 className="font-medium text-[#1A1A1A] mb-2">
                {t("info.secureBooking.title")}
              </h3>
              <p className="text-sm text-[#6B6560]">
                {t("info.secureBooking.description")}
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-[#C9A962]" />
              </div>
              <h3 className="font-medium text-[#1A1A1A] mb-2">
                {t("info.weComeToYou.title")}
              </h3>
              <p className="text-sm text-[#6B6560]">
                {t("info.weComeToYou.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
