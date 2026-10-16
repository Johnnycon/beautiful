import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedUrl, pagePaths } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pagePaths).flatMap((href) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : href === "/book" ? 0.9 : 0.7,
      alternates: { languages: languageAlternates(href) },
    }))
  );
}
