"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";

const eventTypes = ["wedding", "quinceanera", "sweet16", "prom", "corporate", "photoshoot", "other"] as const;
const labelClass = "mb-2 block text-sm font-medium";

export default function ContactForm() {
  const t = useTranslations("contact");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div role="status" className="border-t border-midnight pt-8">
        <h2 className="font-serif text-4xl">{t("form.successTitle")}</h2>
        <p className="mt-4 max-w-md text-slate">{t("form.successMessage")}</p>
        <Button href="/" variant="outline" className="mt-8">
          {t("form.backToHome")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-midnight pt-8">
      <h2 className="font-serif text-3xl md:text-4xl">{t("form.title")}</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="contact-name">
            {t("form.name")}
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder={t("form.namePlaceholder")}
            className="field"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-email">
            {t("form.email")}
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder={t("form.emailPlaceholder")}
            className="field"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-phone">
            {t("form.phone")}
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t("form.phonePlaceholder")}
            className="field"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="contact-subject">
            {t("form.eventType")}
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="field"
          >
            <option value="">{t("form.eventTypePlaceholder")}</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {t(`form.eventTypes.${type}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="contact-message">
            {t("form.message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            placeholder={t("form.messagePlaceholder")}
            className="field resize-y"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-8">
        {t("form.submit")}
      </Button>
    </form>
  );
}
