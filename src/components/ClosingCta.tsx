import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DateRequestBar from "@/components/DateRequestBar";
import { container } from "@/components/PageHeader";

// Dark date-request prompt that closes every page, directly above the footer.
// Children (e.g. the "how it works" steps on the home page) are set below it.
export default function ClosingCta({
  title,
  description,
  showContactLink = true,
  children,
}: {
  title: string;
  description: string;
  showContactLink?: boolean;
  children?: ReactNode;
}) {
  const t = useTranslations("common");

  return (
    <section className="satin py-24 text-pearl md:py-32">
      <div className={container}>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[2.75rem] leading-[1.04] tracking-[-0.01em] md:text-6xl">{title}</h2>
            <p className="mt-5 max-w-md text-lg text-mist">{description}</p>
          </div>
          <DateRequestBar className="lg:col-span-7">
            {showContactLink && (
              <Link href="/contact" className="text-link hover:text-petal">
                {t("contactUs")}
              </Link>
            )}
          </DateRequestBar>
        </div>
        {children}
      </div>
    </section>
  );
}
