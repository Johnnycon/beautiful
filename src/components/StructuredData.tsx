import { siteConfig } from "@/config/site";

// LocalBusiness (BeautySalon) schema so search engines can show the business
// name, service area, address and social profiles.
export default function StructuredData({ description }: { description: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description,
    // One business, one URL: the English home is the canonical entity URL on
    // both locales (the Spanish page is linked through hreflang)
    url: siteConfig.url,
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
