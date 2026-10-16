import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const { instagram, facebook } = siteConfig.social;

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const links = [
    { href: "/services", label: nav("services") },
    { href: "/portfolio", label: nav("portfolio") },
    { href: "/reviews", label: nav("reviews") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="bg-midnight text-pearl">
      <div className="mx-auto max-w-[88rem] px-6 pt-20 pb-10 md:px-10">
        <div className="grid gap-12 border-t border-pearl/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-4xl leading-none tracking-[-0.01em] md:text-5xl">
              Beautiful Inside Out
            </p>
            <p className="mt-5 max-w-sm text-mist">{t("tagline")}</p>
            <div className="mt-8 flex gap-3">
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${instagram.handle}`}
                className="flex size-11 items-center justify-center rounded-full border border-pearl/20 transition-colors hover:border-pearl hover:bg-pearl hover:text-midnight"
              >
                <InstagramIcon size={18} strokeWidth={1.5} />
              </a>
              <a
                href={facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${facebook.handle}`}
                className="flex size-11 items-center justify-center rounded-full border border-pearl/20 transition-colors hover:border-pearl hover:bg-pearl hover:text-midnight"
              >
                <FacebookIcon size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-explore" className="md:col-span-2">
            <h2 id="footer-explore" className="font-sans text-sm text-mist">
              {t("quickLinks")}
            </h2>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-sans text-sm text-mist">{t("contact")}</h2>
            <address className="mt-4 not-italic">
              {t("address")}
              <br />
              {t("city")}
            </address>
            <p className="mt-3 text-sm text-mist">{t("serviceArea")}</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                  Instagram {instagram.handle}
                </a>
              </li>
              <li>
                <a href={facebook.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                  Facebook {facebook.handle}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-sans text-sm text-mist">{t("availability")}</h2>
            <p className="mt-4">{t("byAppointment")}</p>
            <p className="mt-1 text-sm text-mist">
              {t("availableDays")}, {t("earlyMornings")} {t("forWeddings")}
            </p>
            <Link
              href="/book"
              className="mt-5 inline-block text-petal underline decoration-1 underline-offset-4 hover:text-pearl"
            >
              {t("checkAvailability")}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 text-sm text-mist md:flex-row md:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <Link href="/services#policies" className="hover:text-pearl">
            {t("policies")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
