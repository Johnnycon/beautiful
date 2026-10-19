"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { needs, occasions, type Need, type Occasion } from "@/data/booking";
import { describedBy, emailPattern, formatPhone, phonePattern, useFormErrors } from "@/lib/forms";
import Button from "@/components/Button";
import { ChoiceTile, FieldError, FieldHint, OptionalTag } from "@/components/FormParts";
import PageHeader, { container } from "@/components/PageHeader";

type Step = 1 | 2 | 3;
const stepKeys = ["event", "when", "contact"] as const;

const contactMethods = ["text", "call", "email"] as const;
type ContactMethod = (typeof contactMethods)[number];

interface BookingRequest {
  occasion: Occasion | "";
  need: Need;
  partySize: number;
  date: string;
  readyBy: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  notes: string;
}

const emptyRequest: BookingRequest = {
  occasion: "",
  need: "hairAndMakeup",
  partySize: 1,
  date: "",
  readyBy: "",
  location: "",
  name: "",
  email: "",
  phone: "",
  contactMethod: "text",
  notes: "",
};

// Hourly "ready by" times, 6 AM to 9 PM, as HH:MM
const readyByTimes = Array.from({ length: 16 }, (_, i) => `${String(i + 6).padStart(2, "0")}:00`);
const MAX_PARTY = 15;
// Dates closer than this get a note suggesting a DM for a faster answer
const SOON_DAYS = 14;
const STORAGE_KEY = "booking-request";

const questionClass = "mb-3 block font-medium";
const labelClass = "mb-2 block font-medium";

function localISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function BookingFlow() {
  const t = useTranslations("book");
  const tOccasions = useTranslations("common.occasions");
  const format = useFormatter();
  const formRef = useRef<HTMLFormElement>(null);
  const focusStepRef = useRef(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const { errors, validate, recheck, clearErrors } = useFormErrors();

  const [step, setStep] = useState<Step>(1);
  const [request, setRequest] = useState<BookingRequest>(emptyRequest);
  const [isRestored, setIsRestored] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pick up an unfinished request from this tab (it survives a refresh or a look at the
  // portfolio), then apply answers passed in the link, e.g. /book?occasion=wedding
  useEffect(() => {
    let saved: { request?: Partial<BookingRequest>; step?: Step } = {};
    try {
      saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {}
    const params = new URLSearchParams(window.location.search);
    const occasion = occasions.find((o) => o === params.get("occasion"));
    const need = needs.find((n) => n === params.get("need"));

    // eslint-disable-next-line react-hooks/set-state-in-effect -- storage only exists after hydration
    setRequest({
      ...emptyRequest,
      ...saved.request,
      ...(occasion && { occasion }),
      ...(need && { need }),
    });
    if (saved.step && !occasion && !need) setStep(saved.step);
    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (!isRestored || isSubmitted) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ request, step }));
  }, [isRestored, isSubmitted, request, step]);

  // Announce the confirmation by moving focus to its heading
  useEffect(() => {
    if (isSubmitted) successHeadingRef.current?.focus({ preventScroll: true });
  }, [isSubmitted]);

  const update = <K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) =>
    setRequest((prev) => ({ ...prev, [key]: value }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
    recheck(e.target);
  };

  const goToStep = (next: Step) => {
    clearErrors();
    focusStepRef.current = true;
    setStep(next);
  };

  // Only the current step is mounted, so this checks just its fields. While steps swap
  // nothing matches, which also stops a double click from skipping a step unchecked.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formRef.current?.querySelector(`[data-step="${step}"]`))) return;
    if (step < 3) {
      goToStep((step + 1) as Step);
      return;
    }
    sessionStorage.removeItem(STORAGE_KEY);
    setIsSubmitted(true);
    window.scrollTo({ top: 0 });
  };

  // When a step slides in after Continue, Back or Edit, move focus to its heading
  const stepHeadingRef = (heading: HTMLHeadingElement | null) => {
    if (!heading || !focusStepRef.current) return;
    focusStepRef.current = false;
    heading.focus({ preventScroll: true });
    if (heading.getBoundingClientRect().top < 96) heading.scrollIntoView({ block: "start" });
  };

  const today = new Date();
  const soonLimit = new Date(today.getFullYear(), today.getMonth(), today.getDate() + SOON_DAYS);
  const isSoon = Boolean(request.date) && request.date < localISODate(soonLimit);

  // <input type="date"> yields YYYY-MM-DD; format it as a calendar date so it never
  // shifts a day across time zones
  const formatDate = (date: string) =>
    format.dateTime(new Date(`${date}T00:00:00Z`), {
      timeZone: "UTC",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return format.dateTime(new Date(Date.UTC(2000, 0, 1, hours, minutes)), {
      timeZone: "UTC",
      hour: "numeric",
      minute: "2-digit",
    });
  };
  const people = (count: number) =>
    count >= MAX_PARTY ? t("form.peopleOrMore", { count }) : t("form.people", { count });
  const errorText = (name: string) => errors[name] && t(`errors.${errors[name]}`);

  const summary = () => {
    const rows = [
      {
        step: 1 as Step,
        label: t("summary.event"),
        value: request.occasion ? tOccasions(request.occasion) : "",
        detail: `${t(`form.needs.${request.need}`)} · ${people(request.partySize)}`,
      },
      {
        step: 2 as Step,
        label: t("summary.when"),
        value: request.date ? formatDate(request.date) : "",
        detail: request.readyBy
          ? t("summary.readyBy", { time: formatTime(request.readyBy) })
          : t("summary.timeOpen"),
      },
      { step: 2 as Step, label: t("summary.where"), value: request.location },
    ];
    return (
      <dl className="divide-y divide-crystal border-y border-crystal">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4 sm:grid-cols-[8rem_1fr_auto]">
            <dt className="text-sm text-slate sm:pt-0.5">{row.label}</dt>
            <dd className="col-start-1 sm:col-start-2">
              {row.value}
              {row.detail && <span className="block text-sm text-slate">{row.detail}</span>}
            </dd>
            <dd className="col-start-2 row-span-2 row-start-1 sm:col-start-3 sm:row-span-1">
              <button
                type="button"
                onClick={() => goToStep(row.step)}
                aria-label={t("summary.editLabel", { section: row.label })}
                className="text-link text-sm hover:text-rouge"
              >
                {t("summary.edit")}
              </button>
            </dd>
          </div>
        ))}
      </dl>
    );
  };

  if (isSubmitted) {
    const firstName = request.name.trim().split(/\s+/)[0];
    // Keep the phone number on one line
    const contact = request.contactMethod === "email" ? request.email : request.phone.replace(/ /g, "\u00a0");
    const readyBy = request.readyBy
      ? t("summary.readyBy", { time: formatTime(request.readyBy) })
      : t("summary.timeOpen");

    // Where the request stands: sent, being checked, and not booked until they say yes
    const stages = [
      {
        key: "requested",
        state: "done",
        title: formatDate(request.date),
        details: [
          `${request.occasion && tOccasions(request.occasion)} · ${t(`form.needs.${request.need}`)} · ${people(request.partySize)}`,
          `${request.location} · ${readyBy}`,
        ],
      },
      {
        key: "checking",
        state: "current",
        title: t(`success.stages.checking.title.${request.contactMethod}`),
        details: [t(`success.stages.checking.description.${request.contactMethod}`, { contact })],
      },
      {
        key: "booked",
        state: "todo",
        title: t("success.stages.booked.title"),
        details: [
          t("success.stages.booked.description"),
          ...(request.occasion === "wedding" ? [t("success.stages.booked.trial")] : []),
        ],
      },
    ] as const;

    return (
      <section className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className={container}>
          <p className="flex items-center gap-3 font-medium">
            <span aria-hidden className="flex size-6 items-center justify-center rounded-full bg-rouge text-pearl">
              <Check size={14} strokeWidth={3} />
            </span>
            {t("success.sent", { name: firstName })}
          </p>
          <h1
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-6 font-serif text-5xl leading-[1.02] tracking-[-0.015em] outline-none md:text-7xl"
          >
            {t("success.title")}
          </h1>

          <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
            {stages.map((stage) => (
              <li
                key={stage.key}
                aria-current={stage.state === "current" ? "step" : undefined}
                className={`border-t-2 pt-5 ${
                  stage.state === "done"
                    ? "border-midnight"
                    : stage.state === "current"
                      ? "border-rouge"
                      : "border-crystal"
                }`}
              >
                <p
                  className={`flex items-center gap-2.5 text-sm font-medium ${
                    stage.state === "current" ? "text-rouge" : stage.state === "todo" ? "text-slate" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex size-5 items-center justify-center rounded-full ${
                      stage.state === "done"
                        ? "bg-midnight text-pearl"
                        : stage.state === "current"
                          ? "border-2 border-rouge"
                          : "border border-slate/50"
                    }`}
                  >
                    {stage.state === "done" && <Check size={12} strokeWidth={3} />}
                    {stage.state === "current" && <span className="size-2 rounded-full bg-rouge" />}
                  </span>
                  {t(`success.stages.${stage.key}.label`)}
                  <span className="sr-only">({t(`success.state.${stage.state}`)})</span>
                </p>
                <p className="mt-4 font-serif text-2xl leading-tight md:text-[1.75rem]">{stage.title}</p>
                {stage.details.map((detail) => (
                  <p key={detail} className="mt-2 text-slate">
                    {detail}
                  </p>
                ))}
              </li>
            ))}
          </ol>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/portfolio" variant="secondary">
              {t("success.viewPortfolio")}
            </Button>
            <Link href="/" className="text-link hover:text-rouge">
              {t("success.backToHome")}
            </Link>
          </div>
        </div>
      </section>
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
          <div className="md:col-span-7">
            {/* Progress */}
            <ol className="grid grid-cols-3 border-t border-crystal">
              {stepKeys.map((key, i) => {
                const number = i + 1;
                const state = number === step ? "current" : number < step ? "done" : "todo";
                return (
                  <li
                    key={key}
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
                    <span className={`ml-2 ${state === "current" ? "" : "hidden sm:inline"}`}>
                      {t(`steps.${key}.label`)}
                    </span>
                  </li>
                );
              })}
            </ol>

            <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} data-step={step} {...stepMotion}>
                  <h2 ref={stepHeadingRef} tabIndex={-1} className="font-serif text-3xl outline-none md:text-4xl">
                    {t(`steps.${stepKeys[step - 1]}.title`)}
                  </h2>

                  {step === 1 && (
                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className={questionClass}>{t("form.occasion")}</legend>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {occasions.map((occasion) => (
                            <ChoiceTile
                              key={occasion}
                              name="occasion"
                              value={occasion}
                              checked={request.occasion === occasion}
                              onChange={handleChange}
                              required
                              invalid={Boolean(errors.occasion)}
                              describedBy={describedBy(errors.occasion && "booking-occasion-error")}
                            >
                              {tOccasions(occasion)}
                            </ChoiceTile>
                          ))}
                        </div>
                        <FieldError id="booking-occasion-error">{errorText("occasion")}</FieldError>
                      </fieldset>

                      <fieldset>
                        <legend className={questionClass}>{t("form.need")}</legend>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {needs.map((need) => (
                            <ChoiceTile
                              key={need}
                              name="need"
                              value={need}
                              checked={request.need === need}
                              onChange={handleChange}
                            >
                              {t(`form.needs.${need}`)}
                            </ChoiceTile>
                          ))}
                        </div>
                      </fieldset>

                      <div role="group" aria-labelledby="booking-partySize-label" aria-describedby="booking-partySize-hint">
                        <p id="booking-partySize-label" className={questionClass}>
                          {t("form.partySize")}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => update("partySize", Math.max(1, request.partySize - 1))}
                            disabled={request.partySize <= 1}
                            aria-label={t("form.fewer")}
                            className="flex size-12 items-center justify-center rounded-full border border-crystal bg-white transition-colors hover:border-midnight disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-crystal"
                          >
                            <Minus aria-hidden size={18} />
                          </button>
                          <output aria-live="polite" className="min-w-36 text-center font-serif text-2xl tabular-nums">
                            {people(request.partySize)}
                          </output>
                          <button
                            type="button"
                            onClick={() => update("partySize", Math.min(MAX_PARTY, request.partySize + 1))}
                            disabled={request.partySize >= MAX_PARTY}
                            aria-label={t("form.more")}
                            className="flex size-12 items-center justify-center rounded-full border border-crystal bg-white transition-colors hover:border-midnight disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-crystal"
                          >
                            <Plus aria-hidden size={18} />
                          </button>
                        </div>
                        <FieldHint id="booking-partySize-hint">{t("form.partySizeHint")}</FieldHint>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="booking-date">
                          {t("form.date")}
                        </label>
                        <input
                          type="date"
                          id="booking-date"
                          name="date"
                          min={localISODate(today)}
                          value={request.date}
                          onChange={handleChange}
                          required
                          aria-invalid={Boolean(errors.date) || undefined}
                          aria-describedby={describedBy("booking-date-hint", errors.date && "booking-date-error")}
                          className="field"
                        />
                        <FieldError id="booking-date-error">{errorText("date")}</FieldError>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-readyBy">
                          {t("form.readyBy")}
                        </label>
                        <select
                          id="booking-readyBy"
                          name="readyBy"
                          value={request.readyBy}
                          onChange={handleChange}
                          aria-describedby="booking-readyBy-hint"
                          className="field"
                        >
                          <option value="">{t("form.notSure")}</option>
                          {readyByTimes.map((time) => (
                            <option key={time} value={time}>
                              {formatTime(time)}
                            </option>
                          ))}
                        </select>
                        <FieldHint id="booking-readyBy-hint">{t("form.readyByHint")}</FieldHint>
                      </div>

                      {/* The key reassurance: a date is a request until it's confirmed */}
                      <div className="border-l-2 border-rouge pl-4 sm:col-span-2" id="booking-date-hint">
                        <p>{t("form.dateHint")}</p>
                        {isSoon && (
                          <p className="mt-2 text-sm text-slate">
                            {t.rich("form.dateSoon", {
                              link: (chunks) => (
                                <a
                                  href={siteConfig.social.instagram.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-link hover:text-rouge"
                                >
                                  {chunks}
                                </a>
                              ),
                            })}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="booking-location">
                          {t("form.location")}
                        </label>
                        <input
                          type="text"
                          id="booking-location"
                          name="location"
                          autoComplete="address-level2"
                          value={request.location}
                          onChange={handleChange}
                          placeholder={t("form.locationPlaceholder")}
                          required
                          aria-invalid={Boolean(errors.location) || undefined}
                          aria-describedby={describedBy("booking-location-hint", errors.location && "booking-location-error")}
                          className="field"
                        />
                        <FieldHint id="booking-location-hint">{t("form.locationHint")}</FieldHint>
                        <FieldError id="booking-location-error">{errorText("location")}</FieldError>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <>
                      <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="booking-name">
                            {t("form.name")}
                          </label>
                          <input
                            type="text"
                            id="booking-name"
                            name="name"
                            autoComplete="name"
                            value={request.name}
                            onChange={handleChange}
                            required
                            aria-invalid={Boolean(errors.name) || undefined}
                            aria-describedby={describedBy(errors.name && "booking-name-error")}
                            className="field"
                          />
                          <FieldError id="booking-name-error">{errorText("name")}</FieldError>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="booking-email">
                            {t("form.email")}
                          </label>
                          <input
                            type="email"
                            id="booking-email"
                            name="email"
                            autoComplete="email"
                            pattern={emailPattern}
                            value={request.email}
                            onChange={handleChange}
                            placeholder={t("form.emailPlaceholder")}
                            required
                            aria-invalid={Boolean(errors.email) || undefined}
                            aria-describedby={describedBy(errors.email && "booking-email-error")}
                            className="field"
                          />
                          <FieldError id="booking-email-error">{errorText("email")}</FieldError>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="booking-phone">
                            {t("form.phone")}
                          </label>
                          <input
                            type="tel"
                            id="booking-phone"
                            name="phone"
                            autoComplete="tel"
                            value={request.phone}
                            onChange={handleChange}
                            onBlur={(e) => update("phone", formatPhone(e.target.value))}
                            placeholder={t("form.phonePlaceholder")}
                            required
                            pattern={phonePattern}
                            aria-invalid={Boolean(errors.phone) || undefined}
                            aria-describedby={describedBy(errors.phone && "booking-phone-error")}
                            className="field"
                          />
                          <FieldError id="booking-phone-error">{errorText("phone")}</FieldError>
                        </div>
                        <fieldset className="sm:col-span-2">
                          <legend className={labelClass}>{t("form.contactMethod")}</legend>
                          <div className="grid grid-cols-3 gap-2">
                            {contactMethods.map((method) => (
                              <ChoiceTile
                                key={method}
                                name="contactMethod"
                                value={method}
                                checked={request.contactMethod === method}
                                onChange={handleChange}
                              >
                                {t(`form.contactMethods.${method}`)}
                              </ChoiceTile>
                            ))}
                          </div>
                        </fieldset>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="booking-notes">
                            {t("form.notes")}
                            <OptionalTag>{t("form.optional")}</OptionalTag>
                          </label>
                          <textarea
                            id="booking-notes"
                            name="notes"
                            value={request.notes}
                            onChange={handleChange}
                            placeholder={t("form.notesPlaceholder")}
                            rows={4}
                            className="field resize-y"
                          />
                        </div>
                      </div>

                      <h3 className="mt-14 font-sans text-sm text-slate">{t("summary.title")}</h3>
                      <div className="mt-4">{summary()}</div>
                      <p className="mt-8 max-w-xl text-slate">{t("form.reassurance")}</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-row-reverse items-center justify-between gap-6">
                {step < 3 ? (
                  <Button type="submit" variant="secondary">
                    {t("form.next")}
                  </Button>
                ) : (
                  <Button type="submit" size="lg">
                    {t("form.submit")}
                  </Button>
                )}
                {step > 1 && (
                  <button type="button" onClick={() => goToStep((step - 1) as Step)} className="text-link hover:text-rouge">
                    {t("form.back")}
                  </button>
                )}
              </div>
            </form>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <h2 className="border-t border-midnight pt-6 font-serif text-2xl">{t("howItWorks.title")}</h2>
            <ol className="mt-6 space-y-6">
              {(["send", "check", "quote", "hold"] as const).map((key, i) => (
                <li key={key} className="grid grid-cols-[2rem_1fr]">
                  <span className="font-serif text-xl leading-tight text-slate">{i + 1}</span>
                  <div>
                    <p className="font-medium">{t(`howItWorks.${key}.title`)}</p>
                    <p className="mt-1 text-sm text-slate">{t(`howItWorks.${key}.description`)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-crystal pt-6 text-sm text-slate">
              {t("howItWorks.question")}{" "}
              <Link href="/contact" className="text-link text-midnight hover:text-rouge">
                {t("howItWorks.contact")}
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
