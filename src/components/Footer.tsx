"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Instagram, Clock, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">
              Beautiful <span className="text-[#C9A962]">Inside Out</span>
            </h3>
            <p className="text-[#A09A94] text-sm leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/lizbethbiso"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A962] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/beautifulio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A962] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#C9A962] mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  {nav("services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  {nav("portfolio")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  {nav("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  {nav("reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  {nav("bookNow")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#C9A962] mb-6">
              {t("contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A962] mt-0.5 flex-shrink-0" />
                <span className="text-[#A09A94] text-sm">
                  {t("address")}<br />
                  {t("city")}<br />
                  <span className="text-[#C9A962]/80">{t("serviceArea")}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-[#C9A962] flex-shrink-0" />
                <a
                  href="https://instagram.com/lizbethbiso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
                >
                  @lizbethbiso
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Facebook size={18} className="text-[#C9A962] flex-shrink-0" />
                <a
                  href="https://www.facebook.com/beautifulio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
                >
                  @beautifulio
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#C9A962] mb-6">
              {t("availability")}
            </h4>
            <div className="flex items-start gap-3 mb-4">
              <Clock size={18} className="text-[#C9A962] mt-0.5 flex-shrink-0" />
              <div className="text-[#A09A94] text-sm">
                <p className="mb-2">{t("byAppointment")}</p>
                <p>{t("availableDays")}</p>
                <p>{t("earlyMornings")}</p>
                <p>{t("forWeddings")}</p>
              </div>
            </div>
            <Link
              href="/book"
              className="inline-block mt-4 px-6 py-2.5 border border-[#C9A962] text-[#C9A962] text-sm rounded-full hover:bg-[#C9A962] hover:text-white transition-all duration-300"
            >
              {t("checkAvailability")}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A09A94] text-sm">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex gap-6">
              <Link
                href="/contact"
                className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
              >
                {t("contact")}
              </Link>
              <Link
                href="/pricing#policies"
                className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
              >
                {t("policies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
