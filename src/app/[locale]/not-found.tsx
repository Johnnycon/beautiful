import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Button from "@/components/Button";
import { container } from "@/components/PageHeader";

// Without this the 404 inherits the home page's title and description.
// (Next.js already adds `noindex` and answers with a 404 status.)
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: t("title"), description: t("description") };
}

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="satin flex min-h-[80svh] items-center pt-36 pb-24 text-pearl">
      <div className={container}>
        <p className="font-serif text-8xl leading-none text-mist italic md:text-[10rem]">404</p>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-md text-lg text-mist">{t("description")}</p>
        <Button href="/" className="mt-10">
          {t("backHome")}
        </Button>
      </div>
    </section>
  );
}
