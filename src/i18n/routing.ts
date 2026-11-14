import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // English: /, Spanish: /es
  // Every URL serves one language, whoever asks. No redirects based on the
  // browser language or a cookie: search engines advise against automatic
  // language redirects (crawlers would only ever see one version, and a cached
  // redirect could send everyone to the wrong one). hreflang points Spanish
  // searchers to /es, and the header's language switcher covers the rest.
  localeDetection: false,
  localeCookie: false,
  // hreflang alternates are already in each page's <head>, built from the site
  // URL. The proxy's Link header copy is built from the request's Host instead,
  // so on a second host (www, *.vercel.app) the two would disagree, and it is
  // also sent on 404s.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
