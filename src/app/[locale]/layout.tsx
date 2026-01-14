import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Beautiful Inside Out | Luxury Mobile Hair & Makeup",
    es: "Beautiful Inside Out | Maquillaje y Peinado de Lujo a Domicilio"
  };

  const descriptions: Record<string, string> = {
    en: "Premium on-site hair and makeup services for weddings, quinceañeras, sweet 16s, and special events in Chicagoland.",
    es: "Servicios premium de maquillaje y peinado a domicilio para bodas, quinceañeras, sweet 16 y eventos especiales en Chicago."
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: locale === "es"
      ? "maquillaje de lujo, maquillaje de boda, quinceañera glam, belleza móvil, peinado nupcial, sweet 16 maquillaje, Chicago"
      : "luxury hair makeup, wedding makeup, quinceañera glam, mobile beauty, bridal hair, sweet 16 makeup, Chicago",
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
