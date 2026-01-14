import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // English: /, Spanish: /es
});

export type Locale = (typeof routing.locales)[number];
