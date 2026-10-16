import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import { container } from "@/components/PageHeader";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[80svh] items-center pt-36 pb-24">
      <div className={container}>
        <p className="font-serif text-8xl text-slate md:text-[10rem] leading-none">404</p>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-md text-lg text-slate">{t("description")}</p>
        <Button href="/" variant="secondary" className="mt-10">
          {t("backHome")}
        </Button>
      </div>
    </section>
  );
}
