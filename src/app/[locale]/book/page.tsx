import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/metadata";
import { services } from "@/data/services";
import BookingFlow from "@/components/BookingFlow";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/book">): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale as Locale, "book");
}

export default async function BookingPage({ params }: PageProps<"/[locale]/book">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const tServices = await getTranslations("data.services");
  const serviceOptions = services.map((service) => ({
    id: service.id,
    title: tServices(`${service.id}.title`),
    startingPrice: service.startingPrice,
  }));

  return <BookingFlow services={serviceOptions} />;
}
