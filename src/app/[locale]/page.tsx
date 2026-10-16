import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { getTranslatedPortfolioItems } from "@/lib/portfolio";
import Button from "@/components/Button";
import MirrorHero from "@/components/MirrorHero";
import PlaceholderDot from "@/components/PlaceholderDot";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

import { container } from "@/components/PageHeader";

// Real client work chosen for the homepage preview (ids from src/data/portfolio.ts)
const featuredWorkIds = [4, 1, 7, 10, 21];
const featuredReviewIds = [1, 2, 3, 5];

type MorningStep = { time: string; title: string; description: string };
type BookingStep = { title: string; description: string };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "home");
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [t, tServices, tReviews, portfolioItems] = await Promise.all([
    getTranslations("home"),
    getTranslations("data.services"),
    getTranslations("data.testimonials"),
    getTranslatedPortfolioItems(),
  ]);

  const [lead, ...work] = featuredWorkIds.map(
    (id) => portfolioItems.find((item) => item.id === id)!
  );
  const [featuredReview, ...moreReviews] = featuredReviewIds;
  const averageRating =
    testimonials.reduce((sum, { rating }) => sum + rating, 0) / testimonials.length;
  const morningSteps = t.raw("morning.steps") as MorningStep[];
  const bookingSteps = t.raw("howItWorks.steps") as BookingStep[];

  return (
    <>
      {/* Hero: the vanity mirror */}
      <section className="relative overflow-hidden bg-midnight text-pearl">
        <div
          className={`${container} grid min-h-[min(100svh,58rem)] items-center gap-14 pt-28 pb-16 md:grid-cols-12 md:gap-8 md:pt-24`}
        >
          <div className="order-2 md:order-1 md:col-span-6 lg:col-span-6">
            <h1 className="font-serif text-[2.75rem] leading-[1.04] tracking-[-0.015em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-md text-lg text-mist">{t("hero.description")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/book" size="lg">
                {t("hero.bookButton")}
              </Button>
              <Link href="/portfolio" className="text-link hover:text-petal">
                {t("hero.portfolioButton")}
              </Link>
            </div>
            <p className="mt-12 text-sm text-mist">{t("hero.meta")}</p>
          </div>
          <div className="order-1 mx-auto w-[min(66vw,22rem)] pt-6 md:order-2 md:col-span-5 md:col-start-8 md:w-full md:max-w-[30rem] md:pt-0">
            <MirrorHero src="/images/hero/mirror.jpg" alt={t("hero.imageAlt")} />
          </div>
        </div>
      </section>

      {/* Services menu */}
      <section className="py-24 md:py-36">
        <div className={`${container} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 className="font-serif text-4xl md:text-5xl">{t("services.title")}</h2>
              <p className="mt-5 max-w-sm text-slate">{t("services.description")}</p>
              <Link href="/services" className="text-link mt-8 inline-block hover:text-rouge">
                {t("services.viewAll")}
              </Link>
            </div>
          </div>
          <ul className="border-t border-crystal md:col-span-8">
            {services.map((service) => (
              <li key={service.id} className="border-b border-crystal">
                <Link
                  href={`/services#${service.id}`}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-7 md:py-8"
                >
                  <h3 className="font-serif text-2xl transition-colors group-hover:text-rouge md:text-[1.875rem]">
                    {tServices(`${service.id}.title`)}
                  </h3>
                  <span className="whitespace-nowrap tabular-nums text-slate">
                    {t("services.from", { price: service.startingPrice })}
                  </span>
                  <p className="col-span-2 mt-2 max-w-xl text-slate">
                    {tServices(`${service.id}.shortDescription`)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-paper py-24 md:py-36">
        <div className={container}>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="font-serif text-4xl md:col-span-6 md:text-5xl">{t("portfolio.title")}</h2>
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-slate">{t("portfolio.description")}</p>
              <Link href="/portfolio" className="text-link mt-4 inline-block hover:text-rouge">
                {t("portfolio.viewFull")}
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-12">
            <figure className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full md:aspect-auto md:h-[calc(100%-2.25rem)]">
                <Image
                  src={lead.imageUrl}
                  alt={`${lead.title}: ${lead.description}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <PlaceholderDot src={lead.imageUrl} />
              </div>
              <figcaption className="mt-3 text-sm text-slate">{lead.title}</figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-4 md:col-span-7">
              {work.map((item) => (
                <figure key={item.id}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title}: ${item.description}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 28vw"
                      className="object-cover"
                    />
                    <PlaceholderDot src={item.imageUrl} />
                  </div>
                  <figcaption className="mt-3 text-sm text-slate">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The morning of */}
      <section className="bg-midnight py-24 text-pearl md:py-36">
        <div className={container}>
          <div className="grid gap-6 md:grid-cols-12">
            <h2 className="font-serif text-4xl md:col-span-5 md:text-5xl">{t("morning.title")}</h2>
            <p className="max-w-xl text-mist md:col-span-6 md:col-start-7">
              {t("morning.description")}
            </p>
          </div>

          <ol className="mt-16 grid gap-10 border-l border-pearl/20 pl-8 md:mt-20 md:grid-cols-5 md:gap-8 md:border-t md:border-l-0 md:pt-10 md:pl-0">
            {morningSteps.map((step) => (
              <li key={step.time} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[2.3rem] size-2.5 rounded-full bg-bulb shadow-[0_0_10px_2px_rgb(255_231_184/0.5)] md:-top-[2.95rem] md:left-0"
                />
                <p className="tabular-nums text-sm text-mist">{step.time}</p>
                <h3 className="mt-2 font-serif text-[1.375rem]">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-mist">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-petal py-24 md:py-36">
        <div className={`${container} grid gap-16 md:grid-cols-12`}>
          <figure className="md:col-span-7">
            <h2 className="font-sans text-base text-slate">{t("testimonials.title")}</h2>
            <blockquote className="mt-8 font-serif text-[1.75rem] font-medium leading-[1.3] md:text-[2.375rem]">
              &ldquo;{tReviews(`${featuredReview}.quote`)}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <span className="font-medium">{tReviews(`${featuredReview}.name`)}</span>
              <span className="text-slate">, {tReviews(`${featuredReview}.eventType`)}</span>
            </figcaption>
          </figure>

          <div className="md:col-span-4 md:col-start-9">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-rouge" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <p className="text-sm">
                {t("testimonials.rating", {
                  rating: averageRating.toFixed(1),
                  count: testimonials.length,
                })}
              </p>
            </div>
            <ul className="mt-6 divide-y divide-midnight/15 border-y border-midnight/15">
              {moreReviews.map((id) => (
                <li key={id} className="py-6">
                  <blockquote className="text-[0.9375rem]">
                    &ldquo;{tReviews(`${id}.quote`)}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-sm text-slate">
                    {tReviews(`${id}.name`)}, {tReviews(`${id}.eventType`)}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/reviews" className="text-link mt-8 inline-block hover:text-rouge">
              {t("testimonials.readMore")}
            </Link>
          </div>
        </div>
      </section>

      {/* About Lizbeth */}
      <section className="py-24 md:py-36">
        <div className={`${container} grid gap-14 md:grid-cols-12 md:items-center`}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full md:col-span-5 md:max-w-none">
            <Image
              src="/images/hero/about-artist.jpg"
              alt={t("about.imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-serif text-5xl md:text-6xl">{t("about.title")}</h2>
            <p className="mt-3 text-slate">{t("about.role")}</p>
            <div className="mt-10 max-w-[38rem] space-y-5 text-lg leading-relaxed">
              <p className="first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.75rem] first-letter:leading-[0.8] first-letter:text-rouge">
                {t("about.description")}
              </p>
              <p className="text-slate">{t("about.description2")}</p>
              <p className="text-slate">{t("about.description3")}</p>
            </div>
            <ul className="mt-10 max-w-[38rem] divide-y divide-crystal border-y border-crystal">
              {(["premium", "punctual", "calm"] as const).map((key) => (
                <li key={key} className="py-3.5">
                  {t(`about.features.${key}`)}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="text-link mt-10 inline-block hover:text-rouge">
              {t("about.meetStylist")}
            </Link>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="bg-paper py-24 md:py-32">
        <div className={`${container} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <h2 className="font-serif text-4xl md:text-5xl">{t("area.title")}</h2>
            <p className="mt-5 max-w-sm text-slate">{t("area.description")}</p>
            <p className="mt-8">
              {t("area.ask")}{" "}
              <Link href="/contact" className="text-link hover:text-rouge">
                {t("area.askLink")}
              </Link>
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {(["neighborhoods", "suburbs"] as const).map((group) => (
              <div key={group}>
                <h3 className="border-b border-crystal pb-3 font-sans text-base text-slate">
                  {t(`area.${group}Title`)}
                </h3>
                <ul className="mt-4 columns-2 gap-6 font-serif text-xl leading-[2]">
                  {(t.raw(`area.${group}`) as string[]).map((place) => (
                    <li key={place} className="break-inside-avoid">{place}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="bg-midnight pt-24 text-pearl md:pt-36">
        <div className={`${container} grid gap-16 md:grid-cols-12`}>
          <div className="md:col-span-6">
            <h2 className="font-serif text-5xl leading-[1.04] md:text-6xl lg:text-7xl">
              {t("cta.title")}
            </h2>
            <p className="mt-6 max-w-md text-lg text-mist">{t("cta.description")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/book" size="lg">
                {t("cta.bookNow")}
              </Button>
              <Link href="/contact" className="text-link hover:text-petal">
                {t("cta.contact")}
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h3 className="font-sans text-base text-mist">{t("howItWorks.title")}</h3>
            <ol className="mt-6 divide-y divide-pearl/15 border-y border-pearl/15">
              {bookingSteps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] py-6">
                  <span className="font-serif text-3xl leading-none text-crystal">{i + 1}</span>
                  <div>
                    <p className="font-serif text-xl">{step.title}</p>
                    <p className="mt-1 text-[0.9375rem] text-mist">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
