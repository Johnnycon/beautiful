# Beautiful Inside Out

Luxury mobile hair & makeup website built with Next.js 16.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (`motion` package, formerly Framer Motion)
- **Icons**: Lucide React
- **i18n**: next-intl
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── [locale]/  # Locale-wrapped pages (home, services, portfolio, pricing, reviews, book, contact) + localized 404
│   ├── sitemap.ts # sitemap.xml with hreflang alternates
│   └── robots.ts  # robots.txt
├── components/    # Reusable UI components
├── config/        # site.ts – business details, social links, site URL
├── data/          # Non-translatable data (ids, prices, images, icons) for services, portfolio, testimonials, pricing
├── i18n/          # Internationalization config (routing, navigation, request)
├── lib/           # metadata.ts (per-page SEO metadata), portfolio.ts
├── messages/      # Translation files (en.json, es.json) – all user-facing copy lives here
└── proxy.ts       # next-intl locale detection/routing (Next.js 16 "proxy", formerly middleware)
```

## Architecture Conventions

- **Pages are Server Components.** Each `page.tsx` calls `setRequestLocale(locale)` (enables static rendering) and exports `generateMetadata` via `getPageMetadata(locale, "<page>")`. Use `await getTranslations()` in pages and `useTranslations()` in non-async server components.
- **Animations in server components** import `* as motion from "motion/react-client"`. Client components import from `"motion/react"`.
- **Client components** are only used for interactivity: `Header`, `MirrorHero`, `PortfolioGrid`, `BookingFlow`, `ContactForm`.
- **Client translations are scoped.** The locale layout only sends the `nav`, `common`, `portfolio`, `book` and `contact` namespaces to the browser (`clientNamespaces` in `src/app/[locale]/layout.tsx`). If a client component needs another namespace, add it there, or translate on the server and pass strings as props (as done for portfolio items and booking service options).
- **Links**: always use `Link` from `@/i18n/navigation` (not `next/link`) so links keep the current locale.
- **Colors**: use theme tokens (`text-midnight`, `bg-pearl`, `text-rouge`, `border-crystal`, …) defined in `src/app/globals.css`, not hex values.
- **Icons**: `lucide-react` v1 has no brand icons; use `InstagramIcon` / `FacebookIcon` from `src/components/icons/SocialIcons.tsx`.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Design System: "Call time"

The look comes from the morning of the event: vanity-mirror bulbs, satin gowns, pearl and crystal hairpieces, lipstick.

- **Colors** (tokens in `src/app/globals.css`): `midnight` #141B34 (text, dark sections), `pearl` #EEF0F3 (page), `paper` #F7F8FA (alternate light), `petal` #E8C9CB (soft panels), `rouge` #A3243B (the only accent: actions, focus, active states), `crystal` #C9CED8 (hairlines), `slate`/`mist` (secondary text on light/dark), `bulb` (mirror bulbs only)
- **Typography**: Bodoni Moda (headings) + Hanken Grotesk (body, UI). Bodoni's optical size is pinned to `opsz` 12 for all serif text and weight defaults to 500, because its automatic display cut has hairlines too thin to read. Sentence case everywhere; no all-caps eyebrow labels; never highlight a single word in a headline
- **Contrast**: secondary text uses `slate` (≥5:1 on every light background, including petal); keep body text at 4.5:1 or better
- **Signature**: the arched vanity mirror in the home hero (`MirrorHero`); bulbs light in sequence on load, then the reflection slowly dissolves between a bride and a quinceañera (the two main audiences), with named labels and a pause button below instead of dots. Rotation holds on hover, stops once a label is chosen, and is off for reduced-motion users. These are the site's only automatic animations. The arch shape (`rounded-t-full`) repeats as a frame for key photos
- **Structure**: hairline rules (`border-crystal`) and lists instead of cards; 12-column grid in `container` (from `PageHeader.tsx`); interior pages use `PageHeader` + `ClosingCta`
- **Helpers**: `text-link` (underlined link with rouge rule) and `field` (form inputs) utilities in `globals.css`
- **Placeholder images**: Unsplash images show an amber dot (`PlaceholderDot`) in dev or when `NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=true`, so stock photos can be tracked and replaced with real client work

## Key Components

- `Header` - Fixed nav; transparent over the home hero, pearl when scrolled; full-screen midnight menu on mobile
- `Button` - Variants: primary (rouge), secondary (midnight), outline
- `MirrorHero` - Home hero mirror with sequenced bulbs and rotating bridal / quinceañera reflections
- `PortfolioGrid` - Filterable gallery with lightbox
- `PageHeader` / `ClosingCta` - Opening and closing blocks for interior pages

## Internationalization (i18n)

The site supports English and Spanish for the Chicagoland Hispanic community.

### URL Strategy
- **English (default)**: `/`, `/services`, `/portfolio`, etc. (no prefix)
- **Spanish**: `/es`, `/es/services`, `/es/portfolio`, etc.

### Key Files
- `src/i18n/routing.ts` - Locale config (en default, es)
- `src/i18n/navigation.ts` - Locale-aware Link, usePathname, useRouter
- `src/i18n/request.ts` - Server-side message loading
- `src/proxy.ts` - Locale detection and routing
- `src/messages/en.json` - English translations
- `src/messages/es.json` - Spanish translations

### Adding Translations
1. Add keys to both `en.json` and `es.json` in `src/messages/`
2. Use `await getTranslations('namespace')` in pages, `useTranslations('namespace')` in components
3. Access with `t('key')` or `t('nested.key')`; use `t.raw('key')` for arrays (e.g. service `includes`)
4. Page titles/descriptions live under `metadata.<page>`

### Language Switcher
Located in Header component - uses globe icon, switches between locales while preserving current path.

All page content, data (services, testimonials, pricing, portfolio) and metadata are translated.

## Notes

- Real client photos live in `public/images/gallery`. Everything in `public/images/hero` is AI-generated (ChatGPT image generation): the About image stands in for Lizbeth and should be swapped for a real photo of her; the mirror's bride and quinceañera stand in for clients and could be swapped for real client portraits shot to the same framing
- Spare generated images, their prompts and framing guides are kept in `assets/generated/` (not deployed; see its README). They're not client work, so never use them as portfolio pieces
- 9 portfolio slots and 2 service images still use Unsplash placeholders (allowed in `next.config.ts`)
- `/pricing` permanently redirects to `/services#packages` (Pricing was merged into Services)
- Set `NEXT_PUBLIC_SITE_URL` in production (canonical URLs, sitemap, OG tags) – see README
- Forms submit to placeholder success pages (no backend)
- Mobile-first responsive design
- Target audience: US citizens, primarily Chicagoland area
