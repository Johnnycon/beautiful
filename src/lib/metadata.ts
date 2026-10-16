import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export type PageKey =
  | "home"
  | "services"
  | "portfolio"
  | "reviews"
  | "contact"
  | "book";

export const pagePaths: Record<PageKey, string> = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  reviews: "/reviews",
  contact: "/contact",
  book: "/book",
};

export function localizedUrl(locale: Locale, href: string) {
  const pathname = getPathname({ locale, href });
  return pathname === "/" ? siteConfig.url : `${siteConfig.url}${pathname}`;
}

export function languageAlternates(href: string) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, href)])
    ),
    "x-default": localizedUrl(routing.defaultLocale, href),
  };
}

export async function getPageMetadata(
  locale: Locale,
  page: PageKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const href = pagePaths[page];
  const url = localizedUrl(locale, href);
  // The home title is already fully branded; other pages use the layout's title template.
  const title = page === "home" ? { absolute: t("home.title") } : t(`${page}.title`);
  const description = t(`${page}.description`);
  const ogTitle = page === "home" ? t("home.title") : `${t(`${page}.title`)} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(href),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url,
      title: ogTitle,
      description,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_US",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
