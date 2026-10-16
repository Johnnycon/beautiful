import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import { container } from "@/components/PageHeader";

// Dark booking prompt that sits directly above the footer on interior pages
export default function ClosingCta({
  title,
  description,
  buttonLabel,
  showContactLink = true,
}: {
  title: string;
  description: string;
  buttonLabel?: string;
  showContactLink?: boolean;
}) {
  const t = useTranslations("common");

  return (
    <section className="bg-midnight pt-24 text-pearl md:pt-32">
      <div className={`${container} grid gap-8 md:grid-cols-12 md:items-end`}>
        <h2 className="font-serif text-4xl leading-[1.05] md:col-span-7 md:text-6xl">{title}</h2>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-mist">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/book">{buttonLabel ?? t("bookNow")}</Button>
            {showContactLink && (
              <Link href="/contact" className="text-link hover:text-petal">
                {t("contactUs")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
