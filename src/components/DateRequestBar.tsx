"use client";

import { useId, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { bookingHref, occasions, type Occasion } from "@/data/booking";
import { localISODate } from "@/lib/forms";

const segment =
  "relative block px-5 py-3 transition-colors hover:bg-pearl/[0.05] has-focus-visible:bg-pearl/[0.09] has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-petal";
const control = "mt-0.5 block h-7 w-full appearance-none bg-transparent outline-none";

// The first two answers of the date request, asked at the close of every page,
// where someone has seen enough to act. Both are optional: it hands whatever was
// chosen to /book, which picks up from there. Sits on dark sections.
export default function DateRequestBar({
  className = "",
  children,
}: {
  className?: string;
  // Set beside the reassurance line, e.g. a secondary link
  children?: ReactNode;
}) {
  const t = useTranslations("common");
  const router = useRouter();
  const id = useId();
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(bookingHref({ occasion: occasion || undefined, date: date || undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className={`@container ${className}`}>
      <div className="grid overflow-hidden rounded-[4px] border border-pearl/25 bg-pearl/[0.06] shadow-[0_24px_48px_-28px_rgb(0_0_0/0.7)] backdrop-blur-sm @xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]">
        <label htmlFor={`${id}-occasion`} className={`${segment} border-b border-pearl/15 @xl:border-r @xl:border-b-0`}>
          <span className="block text-[0.8125rem] text-mist">{t("dateBar.occasion")}</span>
          <select
            id={`${id}-occasion`}
            value={occasion}
            onChange={(e) => setOccasion(e.target.value as Occasion | "")}
            className={`${control} cursor-pointer pr-7 [&>option]:bg-white [&>option]:text-midnight ${
              occasion ? "text-pearl" : "text-pearl/75"
            }`}
          >
            <option value="">{t("dateBar.occasionPlaceholder")}</option>
            {occasions.map((option) => (
              <option key={option} value={option}>
                {t(`occasions.${option}`)}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden size={16} className="pointer-events-none absolute right-4 bottom-[1.05rem] text-mist" />
        </label>

        <label htmlFor={`${id}-date`} className={`${segment} border-b border-pearl/15 @xl:border-b-0`}>
          <span className="block text-[0.8125rem] text-mist">{t("dateBar.date")}</span>
          <input
            type="date"
            id={`${id}-date`}
            // Set on mount: the page is prerendered, so "today" is only known in the browser
            ref={(input) => {
              if (input) input.min = localISODate(new Date());
            }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${control} [color-scheme:dark] [&::-webkit-date-and-time-value]:text-left ${
              date ? "text-pearl" : "text-pearl/75"
            }`}
          />
        </label>

        <div className="p-1.5">
          <button
            type="submit"
            className="h-full w-full rounded-[3px] bg-rouge px-7 py-3.5 font-medium tracking-[0.01em] whitespace-nowrap text-pearl shadow-[inset_0_1px_0_rgb(255_255_255/0.16)] transition-colors duration-200 hover:bg-rouge-deep"
          >
            {t("dateBar.submit")}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-[0.9375rem]">
        <p className="text-mist">{t("dateBar.note")}</p>
        {children}
      </div>
    </form>
  );
}
