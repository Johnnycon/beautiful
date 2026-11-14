import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // English lives at the root, so /en/... is a duplicate of it. The proxy
      // would answer with a temporary (307) redirect; make it permanent so
      // search engines fold any /en links into the canonical URL.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      // Pricing was merged into the Services page; the Reviews page was dropped
      // in favour of the reviews on the home page
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
