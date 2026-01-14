# Beautiful Inside Out

Luxury mobile hair & makeup website built with Next.js 16.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **i18n**: next-intl
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   └── [locale]/  # Locale-wrapped pages (home, services, portfolio, pricing, reviews, book, contact)
├── components/    # Reusable UI components
├── data/          # Static data (services, portfolio, testimonials, pricing)
├── i18n/          # Internationalization config (routing, navigation, request)
└── messages/      # Translation files (en.json, es.json)
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Design System

- **Colors**: Warm neutrals with gold accents (`#C9A962`)
- **Typography**: Playfair Display (headings), Inter (body)
- **Spacing**: Generous whitespace, luxury aesthetic

## Key Components

- `Header` - Sticky nav, changes style on scroll (white text on hero, dark when scrolled)
- `Button` - Three variants: primary, secondary, outline
- `PortfolioGrid` - Filterable gallery with lightbox
- `SectionHeading` - Consistent section titles with eyebrow text

## Internationalization (i18n)

The site supports English and Spanish for the Chicagoland Hispanic community.

### URL Strategy
- **English (default)**: `/`, `/services`, `/portfolio`, etc. (no prefix)
- **Spanish**: `/es`, `/es/services`, `/es/portfolio`, etc.

### Key Files
- `src/i18n/routing.ts` - Locale config (en default, es)
- `src/i18n/navigation.ts` - Locale-aware Link, usePathname, useRouter
- `src/i18n/request.ts` - Server-side message loading
- `src/middleware.ts` - Locale detection and routing
- `src/messages/en.json` - English translations
- `src/messages/es.json` - Spanish translations

### Adding Translations
1. Add keys to both `en.json` and `es.json` in `src/messages/`
2. Use `useTranslations('namespace')` hook in components
3. Access with `t('key')` or `t('nested.key')`

### Language Switcher
Located in Header component - uses globe icon, switches between locales while preserving current path.

### Components Using Translations
- `Header` - Navigation labels, Book Now button
- `Footer` - All text content, links

### Remaining Work
Page content (hero sections, descriptions) still has inline English. To fully translate:
1. Extract text to translation files
2. Update pages to use `useTranslations()` hook
3. Translate data files (services, testimonials, pricing, portfolio)

## Notes

- Images hosted on Unsplash (configured in `next.config.ts`)
- Forms submit to placeholder success pages (no backend)
- Mobile-first responsive design
- Target audience: US citizens, primarily Chicagoland area
