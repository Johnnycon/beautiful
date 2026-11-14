// Production URL used for canonical links, hreflang alternates, the sitemap and
// Open Graph tags. Set NEXT_PUBLIC_SITE_URL in the deployment environment.
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

// A deploy without a site URL would point every canonical link and the sitemap
// at localhost, quietly asking search engines to drop the site. CI builds
// (Vercel, Netlify, GitHub Actions all set CI) fail instead; local builds fall
// back to localhost.
if (!configuredUrl && process.env.CI) {
  throw new Error("Set NEXT_PUBLIC_SITE_URL to the site's public origin, e.g. https://www.example.com");
}

const siteUrl = configuredUrl ?? "http://localhost:3000";

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
