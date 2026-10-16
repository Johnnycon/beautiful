import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { services } from "@/data/services";
import { addOnPrices, pricingPackages } from "@/data/pricing";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import ClosingCta from "@/components/ClosingCta";
import PageHeader, { container } from "@/components/PageHeader";
import PlaceholderDot from "@/components/PlaceholderDot";

const policies = ["deposit", "cancellation", "travel"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "services");
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [t, tData, tPricing] = await Promise.all([
    getTranslations("services"),
    getTranslations("data.services"),
    getTranslations("data.pricing"),
  ]);

  return (
    <>
      <PageHeader title={t("hero.title")} description={t("hero.description")}>
        <nav className="mt-6 flex gap-6 text-[0.9375rem]" aria-label={t("hero.title")}>
          <a href="#packages" className="text-link hover:text-rouge">
            {t("packages.title")}
          </a>
          <a href="#policies" className="text-link hover:text-rouge">
            {t("policies.title")}
          </a>
        </nav>
      </PageHeader>

      {/* Services */}
      <section className="pb-24 md:pb-36">
        <ol className={`${container} border-t border-crystal`}>
          {services.map((service, index) => (
            <li
              key={service.id}
              id={service.id}
              className="grid gap-8 border-b border-crystal py-12 md:grid-cols-12 md:py-16"
            >
              <div className="relative aspect-[4/5] overflow-hidden md:col-span-4 lg:col-span-3">
                <Image
                  src={service.image}
                  alt={tData(`${service.id}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  preload={index === 0}
                  className="object-cover"
                />
                <PlaceholderDot src={service.image} />
              </div>

              <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <h2 className="font-serif text-3xl md:text-[2.75rem]">{tData(`${service.id}.title`)}</h2>
                  <p className="tabular-nums text-lg">{t("from", { price: service.startingPrice })}</p>
                </div>
                <p className="mt-1 text-sm text-slate">
                  {t("duration")}: {tData(`${service.id}.duration`)}
                </p>
                <p className="mt-6 max-w-2xl text-lg">{tData(`${service.id}.description`)}</p>

                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                  <div>
                    <h3 className="font-sans text-sm text-slate">{t("includes")}</h3>
                    <ul className="mt-3 divide-y divide-crystal border-y border-crystal">
                      {(tData.raw(`${service.id}.includes`) as string[]).map((item) => (
                        <li key={item} className="py-2.5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {service.addOnPrices && (
                    <div>
                      <h3 className="font-sans text-sm text-slate">{t("addOns")}</h3>
                      <ul className="mt-3 divide-y divide-crystal border-y border-crystal">
                        {service.addOnPrices.map((price, i) => (
                          <li key={i} className="flex justify-between gap-4 py-2.5">
                            <span>{tData(`${service.id}.addOns.${i}.name`)}</span>
                            <span className="tabular-nums text-slate">+${price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Link
                  href="/book"
                  className="text-link mt-10 inline-block hover:text-rouge"
                >
                  {t("bookService")}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-paper py-24 md:py-36">
        <div className={container}>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="font-serif text-4xl md:col-span-6 md:text-6xl">{t("packages.title")}</h2>
            <p className="text-slate md:col-span-4 md:col-start-9">{t("packages.description")}</p>
          </div>

          <div className="mt-14 grid border-t border-midnight md:grid-cols-2 lg:grid-cols-4">
            {pricingPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="flex flex-col border-b border-crystal py-10 md:px-8 md:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
              >
                <p className={`h-6 text-sm ${pkg.popular ? "text-rouge" : ""}`}>
                  {pkg.popular ? t("packages.popular") : null}
                </p>
                <h3 className="mt-2 font-serif text-[1.75rem]">{tPricing(`packages.${pkg.id}.name`)}</h3>
                <p className="mt-3 text-[0.9375rem] text-slate">
                  {tPricing(`packages.${pkg.id}.description`)}
                </p>
                <p className="mt-6 font-serif text-5xl tabular-nums">
                  ${pkg.price}
                  {pkg.priceType === "starting" && (
                    <span className="ml-2 font-sans text-sm text-slate">{tPricing("starting")}</span>
                  )}
                </p>
                <ul className="mt-6 grow space-y-2 text-[0.9375rem]">
                  {(tPricing.raw(`packages.${pkg.id}.features`) as string[]).map((feature) => (
                    <li key={feature} className="border-l border-crystal pl-3">
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-slate">{tPricing(`packages.${pkg.id}.idealFor`)}</p>
                <Button
                  href="/book"
                  variant={pkg.popular ? "primary" : "secondary"}
                  className="mt-6 self-start"
                >
                  {t("bookService")}
                </Button>
              </article>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mt-24 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="font-serif text-3xl md:text-4xl">{t("extras.title")}</h2>
              <p className="mt-4 max-w-sm text-slate">{t("extras.description")}</p>
            </div>
            <ul className="divide-y divide-crystal border-y border-crystal md:col-span-7 md:col-start-6">
              {addOnPrices.map((price, i) => (
                <li key={i} className="grid grid-cols-[1fr_auto] gap-x-6 py-4">
                  <span className="font-medium">{tPricing(`addOns.${i}.name`)}</span>
                  <span className="row-span-2 tabular-nums text-lg">+${price}</span>
                  <span className="text-[0.9375rem] text-slate">{tPricing(`addOns.${i}.description`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section id="policies" className="py-24 md:py-32">
        <div className={`${container} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <h2 className="font-serif text-3xl md:text-4xl">{t("policies.title")}</h2>
            <p className="mt-4 max-w-sm text-slate">{t("policies.description")}</p>
          </div>
          <dl className="grid gap-10 md:col-span-7 md:col-start-6">
            {policies.map((policy) => (
              <div key={policy} className="border-t border-crystal pt-5">
                <dt className="font-serif text-2xl">{tPricing(`policies.${policy}.title`)}</dt>
                <dd className="mt-2 max-w-2xl text-slate">{tPricing(`policies.${policy}.description`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta
        title={t("cta.title")}
        description={t("cta.description")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
