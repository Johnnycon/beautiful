// Production URL used for canonical links, hreflang alternates, the sitemap and
// Open Graph tags. Set NEXT_PUBLIC_SITE_URL in the deployment environment.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "Beautiful Inside Out",
  url: siteUrl.replace(/\/$/, ""),
  ogImage: "/og.jpg",
  owner: "Lizbeth",
  address: {
    streetAddress: "3434 W 26th St",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60623",
    addressCountry: "US",
  },
  areaServed: "Chicagoland",
  priceRange: "$$$",
  social: {
    instagram: { handle: "@lizbethbiso", url: "https://instagram.com/lizbethbiso" },
    facebook: { handle: "@beautifulio", url: "https://www.facebook.com/beautifulio" },
  },
} as const;
