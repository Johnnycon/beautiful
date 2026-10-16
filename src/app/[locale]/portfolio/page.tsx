import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { getTranslatedPortfolioItems } from "@/lib/portfolio";
import { siteConfig } from "@/config/site";
import ClosingCta from "@/components/ClosingCta";
import PageHeader, { container } from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import { InstagramIcon } from "@/components/icons/SocialIcons";

const { instagram } = siteConfig.social;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "portfolio");
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [t, tInstagram, portfolioItems] = await Promise.all([
    getTranslations("portfolio"),
    getTranslations("data.instagram"),
    getTranslatedPortfolioItems(),
  ]);

  return (
    <>
      <PageHeader title={t("hero.title")} description={t("hero.description")} />

      <section className="pb-24 md:pb-32">
        <div className={container}>
          <PortfolioGrid items={portfolioItems} />
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-petal py-20 md:py-28">
        <div className={`${container} grid gap-8 md:grid-cols-12 md:items-center`}>
          <div className="md:col-span-6">
            <h2 className="font-serif text-4xl md:text-5xl">{tInstagram("title")}</h2>
            <p className="mt-4 max-w-md text-slate">{tInstagram("description")}</p>
          </div>
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 md:col-span-5 md:col-start-8 md:justify-end"
          >
            <InstagramIcon size={28} strokeWidth={1.5} />
            <span className="font-serif text-3xl underline decoration-rouge decoration-1 underline-offset-8 group-hover:text-rouge md:text-4xl">
              {instagram.handle}
            </span>
          </a>
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
