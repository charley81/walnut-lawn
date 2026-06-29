# Walnut Lawn

> Serving the Walnut Creek community with premium lawn care services.
> Single-page marketing site. Sections are stacked vertically with a smooth-scroll navigation bar.

## Tech Stack

- **Framework:** Astro 5.15 (SSG with island architecture)
- **UI Runtime:** React 19 (interactive components via Astro islands)
- **Styling:** Tailwind CSS 4 (Vite plugin), shadcn/ui components
- **CMS:** Sanity (headless CMS, content fetched at build time)
- **Deploy:** Netlify → [walnutlawn.net](https://walnutlawn.net)
- **Icons:** Lucide React
- **Carousel:** Embla Carousel (with autoplay)
- **Package manager:** pnpm

## Common Commands

```bash
pnpm dev        # Start dev server at http://localhost:4321
pnpm build      # SSG build — fetches Sanity data, outputs to dist/
pnpm preview    # Preview built site locally
pnpm astro      # Run astro CLI helpers
```

## Project Structure

```
src/
├── sanity/                    # Sanity schema definitions
│   └── schemas/
│       ├── index.ts            # Schema exports
│       ├── site-settings.ts    # Global header/footer/nav settings
│       ├── sections.ts         # All page builder section types
│       └── page.ts             # Page document (pageBuilder array)
├── components/
│   ├── ui/                    # shadcn/ui primitives (card, button, accordion, etc.)
│   ├── layout/
│   │   ├── Header.astro       # Top banner + sticky nav + mobile menu
│   │   ├── Footer.astro       # Main footer + bottom legal bar
│   │   └── Logo.astro         # Shared logo component
│   ├── sections/
│   │   ├── Hero.astro         # Hero section (full-screen with CTA)
│   │   ├── About.astro        # About section
│   │   ├── Services.astro     # Services section wrapper (React island)
│   │   ├── ServicesAccordion.tsx  # Shadcn accordion for services
│   │   ├── Work.astro         # Work/gallery section wrapper
│   │   ├── GallerySlider.tsx  # Embla carousel for work images
│   │   ├── WhyUs.astro        # Why Us section wrapper (React island)
│   │   ├── WhyAccordion.tsx   # Shadcn accordion for FAQ
│   │   ├── Testimonials.astro # Testimonials section wrapper
│   │   ├── TestimonialCarousel.tsx  # Embla carousel for testimonials
│   │   ├── TestimonialCard.tsx      # Individual testimonial card
│   │   ├── Contact.astro      # Contact section wrapper
│   │   └── ContactForm.tsx    # Contact form (labels from Sanity)
│   ├── section-wrapper.astro  # Reusable section container
│   └── section-heading.astro  # Reusable section title/number/description
├── lib/
│   ├── sanity.ts              # Sanity client + urlFor() image helper
│   ├── queries.ts             # GROQ queries (siteSettings, page)
│   ├── utils.ts               # cn() utility (clsx + tailwind-merge)
│   └── phone-formatting.ts    # Phone number helpers
├── images/                    # Local image fallbacks
├── layouts/Layout.astro       # Root HTML layout (Header + Footer)
├── pages/
│   ├── index.astro            # Main page — fetches Sanity, renders pageBuilder

└── styles/global.css          # Global CSS + theme tokens (@theme inline)
```

## Architecture & Conventions

### Page Builder Pattern

`src/pages/index.astro` fetches `siteSettings` and `page` documents from Sanity at build time. The `pageBuilder` array determines which sections render and in what order. Each section is a typed object (`heroSection`, `aboutSection`, `servicesSection`, etc.) that maps to a component via a switch statement.

```astro
// index.astro frontmatter
const siteSettings = await client.fetch(siteSettingsQuery)
const pageData = await client.fetch(pageQuery)
const pageBuilder = pageData?.pageBuilder || []
```

### Component Split: Astro vs React

- **Astro components** (`.astro`): Static layout, composition, and section wrappers. No client-side JS.
- **React components** (`.tsx`): Interactive widgets — Services accordion (`client:load`), Why Us accordion (`client:visible`), Work gallery (`client:only`), Testimonials carousel (`client:only`), Contact form (`client:load`).

### Sanity Images

Use `urlFor()` from `src/lib/sanity.ts` to build CDN URLs from Sanity image references:

```ts
import { urlFor } from '../../lib/sanity'
const imageUrl = sanityImage?.asset ? urlFor(sanityImage).url() : null
```

Local images in `src/images/` serve as fallbacks when Sanity images aren't available.

### Styling

- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
- **Theme tokens** in `src/styles/global.css` (oklch colors, mapped via `@theme inline`)
- **`cn()` utility** (`src/lib/utils.ts`): Conditional class merging for React components

### Path Aliases

- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Use for all imports within `src/`, e.g. `@/components/ui/button`

## Sanity CMS

### Content Model

- **`siteSettings`**: Top banner, phone, email, nav links, footer info/links, copyright
- **`page`**: Title + `pageBuilder[]` array of sections
- **Section types**: `heroSection`, `aboutSection`, `servicesSection`, `workSection`, `whyUsSection`, `testimonialsSection`, `contactSection`

### Studio

Built and served at `/studio`. In dev, run `npx sanity dev --port 3333` for a hot-reloading Studio.

### Env Vars

- `PUBLIC_SANITY_PROJECT_ID` — `rpjmkqdf`
- `PUBLIC_SANITY_DATASET` — `production`
- `SANITY_API_TOKEN` — Private token for SSG build-time fetching (never exposed to client)

## Code Style

- TypeScript strict mode
- React JSX with `react-jsx` transform
- Prettier for formatting (config in `.prettierrc`)
- Functional components with named exports
- Avoid default exports for React components

## MCP Servers

- All MCP servers are configured in `~/.pi/agent/mcp.json` (pi's native MCP config)
- Do NOT import from Claude Code (`~/.claude.json`) or any other editor's MCP config
- Do NOT use `claude mcp add` or `sanity mcp configure` — add servers directly to pi's config
- pi discovers MCP servers at startup from `~/.pi/agent/mcp.json` only
- Current servers: Sanity (https://mcp.sanity.io)
