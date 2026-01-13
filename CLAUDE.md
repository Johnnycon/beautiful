# Beautiful Inside Out

Luxury mobile hair & makeup website built with Next.js 16.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
src/
├── app/           # Pages (home, services, portfolio, pricing, reviews, book, contact)
├── components/    # Reusable UI components
└── data/          # Static data (services, portfolio, testimonials, pricing)
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

## Notes

- Images hosted on Unsplash (configured in `next.config.ts`)
- Forms submit to placeholder success pages (no backend)
- Mobile-first responsive design
