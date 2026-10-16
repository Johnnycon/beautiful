import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import "../globals.css";

// Bodoni's optical-size axis keeps hairlines crisp at display sizes
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// Only these namespaces are used by client components; everything else is
// translated on the server and never shipped to the browser.
const clientNamespaces = ["nav", "common", "portfolio", "book", "contact"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#141B34",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("home.title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("home.description"),
    applicationName: siteConfig.name,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for every page under this layout
  setRequestLocale(locale);

  const [messages, t, tMeta] = await Promise.all([
    getMessages(),
    getTranslations("common"),
    getTranslations("metadata"),
  ]);
  const clientMessages = Object.fromEntries(
    clientNamespaces.map((namespace) => [namespace, messages[namespace]])
  );

  return (
    <html lang={locale} className={`${bodoni.variable} ${hanken.variable}`}>
      <body className="antialiased">
        <StructuredData locale={locale} description={tMeta("home.description")} />
        <NextIntlClientProvider messages={clientMessages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-midnight focus:text-pearl"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
