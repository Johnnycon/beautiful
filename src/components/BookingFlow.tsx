"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import PageHeader, { container } from "@/components/PageHeader";

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

export interface ServiceOption {
  id: string;
  title: string;
  startingPrice: number;
}

const times = ["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"];
const labelClass = "mb-2 block text-sm font-medium";

export default function BookingFlow({ services }: { services: ServiceOption[] }) {
  const t = useTranslations("book");
  const format = useFormatter();
  const formRef = useRef<HTMLFormElement>(null);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0 });
  };

  // Only the current step's fields are mounted, so this validates just that step
  const nextStep = () => {
    if (!formRef.current?.reportValidity()) return;
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormStep);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormStep);
  };

  const steps = [t("steps.services"), t("steps.event"), t("steps.contact"), t("steps.review")];
  const selectedService = services.find((s) => s.id === formData.service);

  if (isSubmitted) {
    return (
      <>
        <PageHeader title={t("success.title")} description={t("success.description")} />
        <section className="pb-24 md:pb-32">
          <div className={`${container} grid gap-12 md:grid-cols-12`}>
            <div className="md:col-span-7">
              <h2 className="font-sans text-sm text-slate">{t("success.nextSteps")}</h2>
              <ol className="mt-4 divide-y divide-crystal border-y border-crystal">
                {(["step1", "step2", "step3", "step4"] as const).map((step, i) => (
                  <li key={step} className="grid grid-cols-[3rem_1fr] py-5">
                    <span className="font-serif text-2xl leading-none text-slate">{i + 1}</span>
                    <span className="text-lg">{t(`success.${step}`)}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="/" variant="secondary">
                  {t("success.backToHome")}
                </Button>
                <Link href="/portfolio" className="text-link hover:text-rouge">
                  {t("success.viewPortfolio")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const stepMotion = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
    transition: { duration: 0.2 },
  };

  return (
    <>
      <PageHeader title={t("hero.title")} description={t("hero.description")} />

      <section className="pb-24 md:pb-32">
        <div className={`${container} grid gap-16 md:grid-cols-12`}>
          <div className="md:col-span-8">
            {/* Progress */}
            <ol className="grid grid-cols-4 border-t border-crystal">
              {steps.map((label, i) => {
                const number = i + 1;
                const state = number === currentStep ? "current" : number < currentStep ? "done" : "todo";
                return (
                  <li
                    key={label}
                    aria-current={state === "current" ? "step" : undefined}
                    className={`-mt-px border-t-2 pt-3 text-sm ${
                      state === "current"
                        ? "border-rouge"
                        : state === "done"
                          ? "border-midnight"
                          : "border-transparent text-slate"
                    }`}
                  >
                    <span className="tabular-nums">{number}</span>
                    <span className="ml-2 hidden sm:inline">{label}</span>
                  </li>
                );
              })}
            </ol>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-12">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.fieldset key="step1" {...stepMotion}>
                    <legend className="font-serif text-3xl md:text-4xl">{t("form.selectServices")}</legend>
                    <div className="mt-8 divide-y divide-crystal border-y border-crystal">
                      {services.map((service) => {
                        const isSelected = formData.service === service.id;
                        return (
                          <label
                            key={service.id}
                            className="flex cursor-pointer items-center gap-4 py-5 has-focus-visible:outline-2 has-focus-visible:outline-rouge"
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service.id}
                              checked={isSelected}
                              onChange={handleInputChange}
                              required
                              className="sr-only"
                            />
                            <span
                              aria-hidden
                              className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                                isSelected ? "border-rouge" : "border-slate"
                              }`}
                            >
                              {isSelected && <span className="size-2.5 rounded-full bg-rouge" />}
                            </span>
                            <span className={`grow font-serif text-xl md:text-2xl ${isSelected ? "text-rouge" : ""}`}>
                              {service.title}
                            </span>
                            <span className="whitespace-nowrap text-sm tabular-nums text-slate sm:text-base">
                              {t("form.startingAt")} ${service.startingPrice}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.fieldset>
                )}

                {currentStep === 2 && (
                  <motion.fieldset key="step2" {...stepMotion}>
                    <legend className="font-serif text-3xl md:text-4xl">{t("steps.event")}</legend>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="booking-date">{t("form.eventDate")}</label>
                        <input type="date" id="booking-date" name="date" value={formData.date} onChange={handleInputChange} required className="field" />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-time">{t("form.eventTime")}</label>
                        <select id="booking-time" name="time" value={formData.time} onChange={handleInputChange} required className="field">
                          <option value="">{t("form.selectTime")}</option>
                          {times.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="booking-location">{t("form.location")}</label>
                        <input
                          type="text"
                          id="booking-location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder={t("form.locationPlaceholder")}
                          required
                          className="field"
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-partySize">{t("form.partySize")}</label>
                        <select id="booking-partySize" name="partySize" value={formData.partySize} onChange={handleInputChange} className="field">
                          {partySizes.map((size) => (
                            <option key={size} value={size}>
                              {size} {size === "1" ? t("form.person") : t("form.people")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.fieldset>
                )}

                {currentStep === 3 && (
                  <motion.fieldset key="step3" {...stepMotion}>
                    <legend className="font-serif text-3xl md:text-4xl">{t("steps.contact")}</legend>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="booking-name">{t("form.name")}</label>
                        <input type="text" id="booking-name" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} placeholder={t("form.namePlaceholder")} required className="field" />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-email">{t("form.email")}</label>
                        <input type="email" id="booking-email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} placeholder={t("form.emailPlaceholder")} required className="field" />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-phone">{t("form.phone")}</label>
                        <input type="tel" id="booking-phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleInputChange} placeholder={t("form.phonePlaceholder")} required className="field" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="booking-notes">{t("form.notes")}</label>
                        <textarea id="booking-notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder={t("form.notesPlaceholder")} rows={4} className="field resize-y" />
                      </div>
                    </div>
                  </motion.fieldset>
                )}

                {currentStep === 4 && (
                  <motion.div key="step4" {...stepMotion}>
                    <h2 className="font-serif text-3xl md:text-4xl">{t("form.review.title")}</h2>
                    <dl className="mt-8 divide-y divide-crystal border-y border-crystal">
                      <div className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr]">
                        <dt className="text-sm text-slate">{t("form.review.selectedServices")}</dt>
                        <dd className="font-serif text-xl">{selectedService?.title ?? t("form.notSelected")}</dd>
                      </div>
                      <div className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr]">
                        <dt className="text-sm text-slate">{t("form.review.eventDetails")}</dt>
                        <dd>
                          {formData.date
                            ? // <input type="date"> yields YYYY-MM-DD; format it as a
                              // calendar date so it never shifts a day across time zones
                              format.dateTime(new Date(`${formData.date}T00:00:00Z`), {
                                timeZone: "UTC",
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : t("form.notSelected")}
                          <span className="block text-slate">{formData.time || t("form.timeNotSelected")}</span>
                        </dd>
                      </div>
                      <div className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr]">
                        <dt className="text-sm text-slate">{t("form.location")}</dt>
                        <dd>
                          {formData.location || t("form.notProvided")}
                          <span className="block text-slate">
                            {t("form.partySize")}: {formData.partySize}
                          </span>
                        </dd>
                      </div>
                      <div className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr]">
                        <dt className="text-sm text-slate">{t("form.review.contactInfo")}</dt>
                        <dd>
                          {formData.name}
                          <span className="block text-slate">{formData.email}</span>
                          <span className="block text-slate">{formData.phone}</span>
                        </dd>
                      </div>
                      {formData.notes && (
                        <div className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr]">
                          <dt className="text-sm text-slate">{t("form.review.notes")}</dt>
                          <dd className="whitespace-pre-line">{formData.notes}</dd>
                        </div>
                      )}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between gap-6">
                {currentStep > 1 ? (
                  <button type="button" onClick={prevStep} className="text-link hover:text-rouge">
                    {t("form.back")}
                  </button>
                ) : (
                  <span />
                )}
                {currentStep < 4 ? (
                  <Button onClick={nextStep} variant="secondary" disabled={currentStep === 1 && !formData.service}>
                    {t("form.next")}
                  </Button>
                ) : (
                  <Button type="submit" size="lg">
                    {t("form.submit")}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <aside className="md:col-span-3 md:col-start-10">
            <dl className="space-y-6 border-t border-midnight pt-6">
              {(["quickResponse", "secureBooking", "weComeToYou"] as const).map((key) => (
                <div key={key}>
                  <dt className="font-serif text-xl">{t(`info.${key}.title`)}</dt>
                  <dd className="mt-1 text-sm text-slate">{t(`info.${key}.description`)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
