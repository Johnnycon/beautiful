"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingHref, occasions, type Occasion } from "@/data/booking";
import { describedBy, emailPattern, formatPhone, phonePattern, useFormErrors } from "@/lib/forms";
import Button from "@/components/Button";
import { FieldError, OptionalTag } from "@/components/FormParts";

const labelClass = "mb-2 block text-sm font-medium";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tOccasions = useTranslations("common.occasions");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const { errors, validate, recheck } = useFormErrors();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "" as Occasion | "",
    message: "",
  });

  // Move focus to the confirmation so it's read out, and keep it in view
  useEffect(() => {
    if (!isSubmitted) return;
    successRef.current?.focus({ preventScroll: true });
    successRef.current?.scrollIntoView({ block: "start" });
  }, [isSubmitted]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    recheck(e.target);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formRef.current)) setIsSubmitted(true);
  };

  // Back to the filled-in form, ready to fix the email
  const editMessage = () => {
    setIsSubmitted(false);
    requestAnimationFrame(() => document.getElementById("contact-email")?.focus());
  };

  const errorText = (name: string) => errors[name] && t(`errors.${errors[name]}`);

  if (isSubmitted) {
    const firstName = formData.name.trim().split(/\s+/)[0];
    const hasEvent = formData.subject !== "" && formData.subject !== "other";

    return (
      <div className="border-t border-midnight pt-8">
        <h2 ref={successRef} tabIndex={-1} className="font-serif text-4xl outline-none">
          {t("success.title", { name: firstName })}
        </h2>
        <p className="mt-4 max-w-md text-lg">
          {t.rich("success.message", {
            email: formData.email,
            strong: (chunks) => <strong className="font-medium">{chunks}</strong>,
          })}
        </p>
        <p className="mt-3 text-sm text-slate">
          {t("success.wrongEmail")}{" "}
          <button type="button" onClick={editMessage} className="text-link text-midnight hover:text-rouge">
            {t("success.edit")}
          </button>
        </p>

        <div className="mt-10 border-t border-crystal pt-8">
          <h3 className="font-serif text-2xl">{t("success.dateTitle")}</h3>
          <p className="mt-2 max-w-md text-slate">{t("success.dateDescription")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={bookingHref(hasEvent ? { occasion: formData.subject as Occasion } : {})} variant="secondary">
              {t("success.requestDate")}
            </Button>
            <Link href="/portfolio" className="text-link hover:text-rouge">
              {t("success.viewPortfolio")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="border-t border-midnight pt-8">
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
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={describedBy(errors.name && "contact-name-error")}
            className="field"
          />
          <FieldError id="contact-name-error">{errorText("name")}</FieldError>
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
            pattern={emailPattern}
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder={t("form.emailPlaceholder")}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={describedBy(errors.email && "contact-email-error")}
            className="field"
          />
          <FieldError id="contact-email-error">{errorText("email")}</FieldError>
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-phone">
            {t("form.phone")}
            <OptionalTag>{t("form.optional")}</OptionalTag>
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={(e) => setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }))}
            pattern={phonePattern}
            placeholder={t("form.phonePlaceholder")}
            aria-invalid={Boolean(errors.phone) || undefined}
            aria-describedby={describedBy(errors.phone && "contact-phone-error")}
            className="field"
          />
          <FieldError id="contact-phone-error">{errorText("phone")}</FieldError>
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
            aria-invalid={Boolean(errors.subject) || undefined}
            aria-describedby={describedBy(errors.subject && "contact-subject-error")}
            className="field"
          >
            <option value="">{t("form.eventTypePlaceholder")}</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>
                {tOccasions(occasion)}
              </option>
            ))}
          </select>
          <FieldError id="contact-subject-error">{errorText("subject")}</FieldError>
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
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={describedBy(errors.message && "contact-message-error")}
            className="field resize-y"
          />
          <FieldError id="contact-message-error">{errorText("message")}</FieldError>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" size="lg">
          {t("form.submit")}
        </Button>
        <p className="text-sm text-slate">{t("form.responseTime")}</p>
      </div>
    </form>
  );
}
