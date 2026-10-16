import { siteConfig } from "@/config/site";
import { localizedUrl } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

// LocalBusiness (BeautySalon) schema so search engines can show the business
// name, service area, address and social profiles.
export default function StructuredData({
  locale,
  description,
}: {
  locale: Locale;
  description: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description,
    url: localizedUrl(locale, "/"),
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: siteConfig.priceRange,
    address: { "@type": "PostalAddress", ...siteConfig.address },
    areaServed: { "@type": "Place", name: siteConfig.areaServed },
    founder: { "@type": "Person", name: siteConfig.owner },
    knowsLanguage: ["en", "es"],
    sameAs: [siteConfig.social.instagram.url, siteConfig.social.facebook.url],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values are static strings we control.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
