import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Star } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { testimonials } from "@/data/testimonials";
import ClosingCta from "@/components/ClosingCta";
import PageHeader, { container } from "@/components/PageHeader";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/reviews">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "reviews");
}

export default async function ReviewsPage({ params }: PageProps<"/[locale]/reviews">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [t, tData] = await Promise.all([
    getTranslations("reviews"),
    getTranslations("data.testimonials"),
  ]);
  const [featured, ...others] = testimonials;
  const averageRating =
    testimonials.reduce((sum, { rating }) => sum + rating, 0) / testimonials.length;

  return (
    <>
      <PageHeader title={t("hero.title")} description={t("hero.description")}>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex gap-0.5 text-rouge" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={16} className="fill-current" />
            ))}
          </div>
          <p className="text-sm">
            <span className="font-medium">{averageRating.toFixed(1)}</span>{" "}
            <span className="text-slate">{t("hero.reviewCount", { count: testimonials.length })}</span>
          </p>
        </div>
      </PageHeader>

      {/* Featured */}
      <section className="bg-petal py-20 md:py-32">
        <figure className={`${container} max-w-[72rem]`}>
          <blockquote className="font-serif text-[1.75rem] font-medium leading-[1.3] md:text-[2.75rem] md:leading-[1.25]">
            &ldquo;{tData(`${featured.id}.quote`)}&rdquo;
          </blockquote>
          <figcaption className="mt-10">
            <span className="font-medium">{tData(`${featured.id}.name`)}</span>
            <span className="text-slate">
              , {tData(`${featured.id}.eventType`)}, {tData(`${featured.id}.date`)}
            </span>
          </figcaption>
        </figure>
      </section>

      {/* All reviews */}
      <section className="py-24 md:py-32">
        <div className={container}>
          <h2 className="font-serif text-4xl md:text-5xl">{t("all.title")}</h2>
          <div className="mt-12 gap-x-12 md:columns-2 lg:columns-3">
            {others.map((testimonial) => (
              <figure
                key={testimonial.id}
                className="mb-10 break-inside-avoid border-t border-crystal pt-6"
              >
                <blockquote className="text-lg leading-relaxed">
                  &ldquo;{tData(`${testimonial.id}.quote`)}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium">{tData(`${testimonial.id}.name`)}</span>
                  <span className="text-slate">
                    , {tData(`${testimonial.id}.eventType`)}, {tData(`${testimonial.id}.date`)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
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
