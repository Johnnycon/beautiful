"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  // The home page opens on the dark mirror hero, so the header starts transparent there
  const isOverHero = pathname === "/" && !isScrolled && !isMenuOpen;
  const alternateLocale = locale === "en" ? "es" : "en";

  const navLinks = [
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const tone = isOverHero || isMenuOpen ? "text-pearl" : "text-midnight";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isMenuOpen
          ? "bg-midnight"
          : isOverHero
            ? "bg-transparent"
            : "bg-pearl/92 backdrop-blur-md border-b border-crystal/70"
      }`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex h-18 max-w-[88rem] items-center justify-between px-6 md:px-10 ${tone}`}
      >
        <Link href="/" className="font-serif text-[1.375rem] tracking-[-0.01em] whitespace-nowrap">
          Beautiful Inside Out
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`underline-offset-[6px] decoration-1 hover:underline ${
                      isActive ? "underline decoration-rouge" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={pathname}
            locale={alternateLocale}
            hrefLang={alternateLocale}
            lang={alternateLocale}
            className="text-[0.9375rem] opacity-80 hover:opacity-100"
          >
            {t("switchLanguage")}
          </Link>
          <Link
            href="/book"
            className={`rounded-[3px] border px-5 py-2.5 text-[0.9375rem] font-medium transition-colors ${
              // Over the hero, which has its own booking button, this steps back to an outline
              isOverHero
                ? "border-pearl/50 text-pearl hover:border-pearl hover:bg-pearl hover:text-midnight"
                : "border-rouge bg-rouge text-pearl hover:border-rouge-deep hover:bg-rouge-deep"
            }`}
          >
            {t("bookNow")}
          </Link>
        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          className="-mr-2 p-2 md:hidden"
        >
          {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-18 bottom-0 flex flex-col justify-between bg-midnight px-6 pt-8 pb-10 text-pearl md:hidden"
          >
            <ul className="space-y-1">
              {[{ href: "/", label: t("home") }, ...navLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 font-serif text-[2.5rem] leading-tight aria-[current=page]:text-petal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4 border-t border-pearl/15 pt-6">
              <Link
                href={pathname}
                locale={alternateLocale}
                hrefLang={alternateLocale}
                lang={alternateLocale}
                onClick={() => setIsMenuOpen(false)}
                className="text-mist"
              >
                {t("switchLanguage")}
              </Link>
              <Link
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-[3px] bg-rouge px-6 py-3 font-medium text-pearl"
              >
                {t("bookNow")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
