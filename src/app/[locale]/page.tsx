import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { getTranslatedPortfolioItems } from "@/lib/portfolio";
import { siteConfig } from "@/config/site";
import { bookingHref } from "@/data/booking";
import ClosingCta from "@/components/ClosingCta";
import DateRequestBar from "@/components/DateRequestBar";
import LightUp from "@/components/LightUp";
import ServiceMenu from "@/components/ServiceMenu";
import WorkReel from "@/components/WorkReel";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

import { container } from "@/components/PageHeader";

// Real client work chosen for the homepage reel (ids from src/data/portfolio.ts),
// ordered so gowns, faces and hair details alternate
const featuredWorkIds = [5, 10, 1, 6, 13, 7, 2, 4];
const featuredReviewIds = [1, 2, 3, 5];
const requestSteps = ["send", "check", "quote", "hold"] as const;

type MorningStep = { time: string; title: string; description: string };
type AreaGroup = { title: string; places: string[] };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "home");
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [t, tServices, tReviews, tBook, tCommon, portfolioItems] = await Promise.all([
    getTranslations("home"),
    getTranslations("data.services"),
    getTranslations("data.testimonials"),
    getTranslations("book.howItWorks"),
    getTranslations("common"),
    getTranslatedPortfolioItems(),
  ]);

  const work = featuredWorkIds.map((id) => portfolioItems.find((item) => item.id === id)!);
  const [featuredReview, ...moreReviews] = featuredReviewIds;
  const averageRating =
    testimonials.reduce((sum, { rating }) => sum + rating, 0) / testimonials.length;
  const morningSteps = t.raw("morning.steps") as MorningStep[];
  // The hero photograph is art-directed: a tall crop on phones, a wide one on desktop
  const {
    props: { srcSet: heroWide },
  } = getImageProps({ alt: "", sizes: "100vw", width: 1536, height: 1024, src: "/images/hero/setup-wide.jpg" });
  const {
    props: { srcSet: heroTall, src: heroSrc },
  } = getImageProps({ alt: "", sizes: "100vw", width: 1024, height: 1536, src: "/images/hero/setup-tall.jpg" });
  const priceOf = (id: string) => services.find((service) => service.id === id)!.startingPrice;
  const areaGroups = t.raw("area.groups") as AreaGroup[];

  return (
    <>
      {/* Hero: built around what a visitor who already knows Lizbeth's work came to
          find out (does she come to me, for my event, for about how much) and the
          ask itself. One wide photograph of her set-up waiting in a client's home
          runs across the top; the date request sits on its lower edge. */}
      <section className="satin overflow-hidden text-pearl">
        <div className="relative isolate">
          {/* The photograph dissolves into the satin at its lower edge */}
          <div className="absolute inset-x-0 top-0 -z-10 h-[40svh] [mask-image:linear-gradient(to_bottom,#000_50%,transparent)] lg:h-full lg:[mask-image:linear-gradient(to_bottom,#000_76%,transparent)]">
            <picture>
              <source media="(min-width: 1024px)" srcSet={heroWide} sizes="100vw" />
              <img
                src={heroSrc}
                srcSet={heroTall}
                sizes="100vw"
                alt={t("hero.imageAlt")}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 size-full object-cover object-[50%_12%] lg:object-[50%_30%]"
              />
            </picture>
            {/* Shade behind the header and, on desktop, behind the headline */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-[62%] bg-linear-to-r from-ink/85 via-ink/50 to-transparent max-lg:hidden"
            />
          </div>

          <div
            className={`${container} flex flex-col justify-end pt-[31svh] pb-6 lg:min-h-[min(74svh,44rem)] lg:pt-36 lg:pb-24`}
          >
            <h1 className="font-serif text-[clamp(2rem,9vw,2.5rem)] leading-[1.04] tracking-[-0.015em] sm:text-6xl lg:max-w-[21ch] lg:text-[clamp(3.25rem,4.9vw,4.75rem)]">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-md text-mist lg:mt-6 lg:text-lg">{t("hero.description")}</p>
          </div>
        </div>

        <div className={`${container} pb-10 lg:pb-12`}>
          {/* On desktop the bar straddles the photograph's lower edge */}
          <DateRequestBar className="relative z-10 max-w-3xl lg:-mt-10">
            {locale === "en" ? (
              <Link
                href="/"
                locale="es"
                hrefLang="es"
                lang="es"
                className="underline-offset-[6px] decoration-1 hover:underline"
              >
                {t("hero.language")}
              </Link>
            ) : (
              <span>{t("hero.language")}</span>
            )}
          </DateRequestBar>

          {/* The answers people come for, as one quiet rule under the ask */}
          <dl className="mt-10 grid gap-x-8 border-t border-pearl/15 sm:grid-cols-3 lg:mt-12">
            <div className="border-b border-pearl/15 py-4 sm:border-b-0 sm:py-5">
              <dt className="text-[0.8125rem] text-mist">{t("hero.facts.prices")}</dt>
              <dd className="mt-0.5">
                <Link href="/services" className="underline-offset-[6px] decoration-1 hover:underline">
                  {t("hero.facts.pricesValue", {
                    bridal: priceOf("bridal-hair-makeup"),
                    quinceanera: priceOf("quinceanera-glam"),
                  })}
                </Link>
              </dd>
            </div>
            <div className="border-b border-pearl/15 py-4 sm:border-b-0 sm:py-5">
              <dt className="text-[0.8125rem] text-mist">{t("hero.facts.experience")}</dt>
              <dd className="mt-0.5">{t("hero.facts.experienceValue")}</dd>
            </div>
            <div className="py-4 sm:py-5">
              <dt className="text-[0.8125rem] text-mist">{t("hero.facts.instagram")}</dt>
              <dd className="mt-0.5">
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-[6px] decoration-1 hover:underline"
                >
                  {siteConfig.social.instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Services menu */}
      <section className="py-24 md:py-36">
        <div className={container}>
          <ServiceMenu
            intro={
              <>
                <h2 className="font-serif text-4xl md:text-5xl">{t("services.title")}</h2>
                <p className="mt-5 max-w-sm text-slate">{t("services.description")}</p>
                <Link href="/services" className="text-link mt-8 inline-block hover:text-rouge">
                  {t("services.viewAll")}
                </Link>
              </>
            }
            items={services.map((service) => ({
              id: service.id,
              title: tServices(`${service.id}.title`),
              description: tServices(`${service.id}.shortDescription`),
              price: t("services.from", { price: service.startingPrice }),
              image: service.image,
            }))}
          />
        </div>
      </section>

      {/* Recent work */}
      <section className="overflow-hidden bg-paper py-24 md:py-36">
        <WorkReel
          heading={
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl">{t("portfolio.title")}</h2>
              <p className="mt-5 max-w-lg text-slate">{t("portfolio.description")}</p>
            </div>
          }
          items={work.map((item) => ({
            id: item.id,
            src: item.imageUrl,
            title: item.title,
            description: item.description,
          }))}
          label={t("portfolio.reelLabel")}
          previousLabel={tCommon("previous")}
          nextLabel={tCommon("next")}
          viewAllLabel={t("portfolio.viewFull")}
        />
      </section>

      {/* The morning of: a call sheet whose bulbs switch on as it scrolls into view */}
      <section className="satin py-24 text-pearl md:py-36">
        <div className={container}>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="font-serif text-4xl md:col-span-5 md:text-6xl">{t("morning.title")}</h2>
            <p className="max-w-xl text-mist md:col-span-6 md:col-start-7">{t("morning.description")}</p>
          </div>

          <LightUp className="mt-16 md:mt-24">
            <ol className="grid gap-12 border-l border-pearl/20 pl-8 lg:grid-cols-5 lg:gap-8 lg:border-t lg:border-l-0 lg:pt-12 lg:pl-0">
              {morningSteps.map((step, i) => {
                // "5:30 AM" / "5:30 a. m.": the clock is set large, the rest small beside it
                const [clock, ...meridiem] = step.time.split(" ");
                return (
                  <li key={step.time} className="relative">
                    <span
                      aria-hidden
                      className="absolute top-3 -left-[calc(2rem+6.5px)] size-3 rounded-full bg-pearl/25 group-data-lit:animate-bulb-on lg:-top-[calc(3rem+6.5px)] lg:left-0"
                      style={{ animationDelay: `${150 + i * 260}ms` }}
                    />
                    <p className="flex flex-wrap items-baseline gap-x-2 font-serif text-6xl leading-none italic lg:text-5xl xl:text-6xl">
                      {clock}
                      <span className="font-sans text-base text-mist not-italic">{meridiem.join(" ")}</span>
                    </p>
                    <h3 className="mt-5 font-serif text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-mist">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </LightUp>

          <Link
            href={bookingHref({ occasion: "wedding" })}
            className="text-link mt-14 inline-block hover:text-petal md:mt-20"
          >
            {t("morning.planLink")}
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-petal py-24 md:py-36">
        <div className={container}>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-midnight/15 pb-5">
            <h2 className="font-sans text-base text-slate">{t("testimonials.title")}</h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-rouge" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <p className="text-[0.9375rem]">
                {t("testimonials.rating", {
                  rating: averageRating.toFixed(1),
                  count: testimonials.length,
                })}
              </p>
            </div>
          </div>

          <figure className="mt-12 md:mt-16">
            {/* The opening mark hangs in the margin so the words align */}
            <blockquote className="max-w-[68rem] -indent-[0.4em] pl-[0.4em] font-serif text-[1.75rem] leading-[1.28] italic sm:text-4xl sm:leading-[1.25] lg:text-[3.25rem] lg:leading-[1.2]">
              &ldquo;{tReviews(`${featuredReview}.quote`)}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-lg">
              <span className="font-medium">{tReviews(`${featuredReview}.name`)}</span>
              <span className="text-slate">, {tReviews(`${featuredReview}.eventType`)}</span>
            </figcaption>
          </figure>

          <ul className="mt-16 grid gap-x-8 gap-y-10 md:mt-24 md:grid-cols-3">
            {moreReviews.map((id) => (
              <li key={id} className="border-t border-midnight/15 pt-6">
                <blockquote>&ldquo;{tReviews(`${id}.quote`)}&rdquo;</blockquote>
                <p className="mt-4 text-[0.9375rem] text-slate">
                  <span className="font-medium text-midnight">{tReviews(`${id}.name`)}</span>,{" "}
                  {tReviews(`${id}.eventType`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About Lizbeth */}
      <section className="py-24 md:py-36">
        <div className={`${container} grid gap-14 md:grid-cols-12 md:items-center`}>
          <div className="relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-[30rem]">
            {/* Fine outer rule around the arch */}
            <div aria-hidden className="absolute -inset-3 rounded-t-full border border-crystal" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image
                src="/images/hero/about-artist.jpg"
                alt={t("about.imageAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
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
            <div className="md:sticky md:top-28">
              <h2 className="font-serif text-4xl md:text-5xl">{t("area.title")}</h2>
              <p className="mt-5 max-w-sm text-slate">{t("area.description")}</p>
              <p className="mt-8">
                {t("area.ask")}{" "}
                <Link href="/contact" className="text-link hover:text-rouge">
                  {t("area.askLink")}
                </Link>
              </p>
            </div>
          </div>
          <div className="space-y-12 md:col-span-7 md:col-start-6">
            {areaGroups.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-crystal pb-3 font-sans text-base text-slate">{group.title}</h3>
                <ul className="mt-3 grid grid-cols-2 gap-x-6 font-serif text-[1.0625rem] leading-snug sm:grid-cols-3 md:text-lg">
                  {group.places.map((place) => (
                    <li key={place} className="py-1.5">
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Date request, and what happens after it's sent */}
      <ClosingCta title={t("cta.title")} description={t("cta.description")}>
        <div className="mt-20 border-t border-pearl/15 pt-10 md:mt-24">
          <h3 className="font-sans text-base text-mist">{tBook("title")}</h3>
          <ol className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {requestSteps.map((key, i) => (
              <li key={key} className="grid grid-cols-[2.75rem_1fr]">
                <span aria-hidden className="font-serif text-4xl leading-none text-petal italic">
                  {i + 1}
                </span>
                <div>
                  <p className="font-serif text-xl leading-snug">{tBook(`${key}.title`)}</p>
                  <p className="mt-1.5 text-[0.9375rem] text-mist">{tBook(`${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ClosingCta>
    </>
  );
}
