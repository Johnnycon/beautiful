import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pricing was merged into the Services page; the Reviews page was dropped
  // in favour of the reviews on the home page
  async redirects() {
    return [
      { source: "/pricing", destination: "/services#packages", permanent: true },
      { source: "/es/pricing", destination: "/es/services#packages", permanent: true },
      { source: "/reviews", destination: "/#reviews", permanent: true },
      { source: "/es/reviews", destination: "/es#reviews", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Placeholder portfolio images until real photos replace them
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
