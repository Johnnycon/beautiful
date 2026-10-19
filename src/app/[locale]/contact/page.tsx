import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import ClosingCta from "@/components/ClosingCta";
import ContactForm from "@/components/ContactForm";
import PageHeader, { container } from "@/components/PageHeader";

const { instagram, facebook } = siteConfig.social;
const faqs = ["advance", "travel", "cancellation", "trials"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  const details = [
    {
      label: "Instagram",
      value: (
        <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="text-link hover:text-rouge">
          {instagram.handle}
        </a>
      ),
      note: t("info.instagramNote"),
    },
    {
      label: "Facebook",
      value: (
        <a href={facebook.url} target="_blank" rel="noopener noreferrer" className="text-link hover:text-rouge">
          {facebook.handle}
        </a>
      ),
      note: t("info.facebookNote"),
    },
    { label: t("info.serviceArea"), value: t("info.serviceAreaValue"), note: t("info.serviceAreaNote") },
    { label: t("info.availability"), value: t("info.availabilityValue"), note: t("info.availabilityNote") },
  ];

  return (
    <>
      <PageHeader title={t("hero.title")} description={t("hero.description")} />

      <section className="pb-24 md:pb-32">
        <div className={`${container} grid gap-16 md:grid-cols-12`}>
          <dl className="grid content-start gap-8 border-t border-midnight pt-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-1">
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="text-sm text-slate">{detail.label}</dt>
                <dd className="mt-1 font-serif text-2xl">{detail.value}</dd>
                <dd className="mt-1 text-sm text-slate">{detail.note}</dd>
              </div>
            ))}
          </dl>
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-24 md:py-32">
        <div className={`${container} grid gap-10 md:grid-cols-12`}>
          <h2 className="font-serif text-4xl md:col-span-4 md:text-5xl">{t("faq.title")}</h2>
          <div className="divide-y divide-crystal border-y border-crystal md:col-span-7 md:col-start-6">
            {faqs.map((faq) => (
              <details key={faq} className="group py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-serif text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
                  {t(`faq.questions.${faq}.q`)}
                  <span aria-hidden className="font-sans text-2xl leading-none text-rouge transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-slate">{t(`faq.questions.${faq}.a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title={t("cta.title")}
        description={t("cta.description")}
        buttonLabel={tCommon("requestDate")}
        showContactLink={false}
      />
    </>
  );
}
