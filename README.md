# Beautiful Inside Out

Marketing site for Beautiful Inside Out, a luxury mobile hair & makeup business serving Chicagoland. English and Spanish.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, next-intl, and Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://www.example.com`. Used for canonical URLs, hreflang alternates, `sitemap.xml`, `robots.txt` and Open Graph tags. It is read at build time (pages are statically generated). On Vercel it falls back to the production domain automatically; elsewhere it falls back to `http://localhost:3000`. |

## SEO

- Per-page `<title>`, description, canonical URL and `en` / `es` / `x-default` hreflang alternates (`src/lib/metadata.ts`, copy in `metadata` in the message files)
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and `src/app/robots.ts`
- Open Graph / Twitter card image: `public/og.jpg` (1200×630)
- `BeautySalon` JSON-LD structured data on every page (`src/components/StructuredData.tsx`), business details in `src/config/site.ts`
- All pages are statically prerendered for both locales

See `CLAUDE.md` for project structure and i18n conventions.
