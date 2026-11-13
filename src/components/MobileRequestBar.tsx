"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "@/components/icons/SocialIcons";

const { instagram } = siteConfig.social;

// How far down the page before the bar appears, and how close to the end it
// steps aside for the closing date request and the footer
const SHOW_AFTER = 520;
const HIDE_BEFORE_END = 760;

// On phones the request button scrolls away with the hero, so once the visitor
// is into the page a slim bar keeps it (and an Instagram DM) within thumb reach.
export default function MobileRequestBar() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // The request page is already the destination
  const isEnabled = pathname !== "/book";

  useEffect(() => {
    if (!isEnabled) return;
    const update = () => {
      const { scrollY, innerHeight } = window;
      const remaining = document.documentElement.scrollHeight - (scrollY + innerHeight);
      setIsVisible(scrollY > SHOW_AFTER && remaining > HIDE_BEFORE_END);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isEnabled, pathname]);

  if (!isEnabled) return null;

  return (
    <div
      // Kept in the DOM so it can slide; inert while off-screen
      inert={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-pearl/15 bg-midnight/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[translate,visibility] duration-300 ease-out md:hidden ${
        isVisible ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("instagramDm")}
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-pearl/25 text-pearl"
        >
          <InstagramIcon size={20} strokeWidth={1.5} />
        </a>
        <Link
          href="/book"
          className="flex h-12 flex-1 items-center justify-center rounded-[3px] bg-rouge font-medium tracking-[0.01em] text-pearl shadow-[inset_0_1px_0_rgb(255_255_255/0.16)]"
        >
          {t("requestDate")}
        </Link>
      </div>
    </div>
  );
}
