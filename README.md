# Walnut Lawn — [WalnutLawn.net](https://walnutlawn.net)

> Serving the Walnut Creek community with premium lawn care services.
> A single-page marketing site built with Astro, powered by Sanity CMS.

## Tech Stack

| Layer              | Technology                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **Framework**      | [Astro](https://astro.build) 5.15 (SSG with island architecture) |
| **UI Runtime**     | [React](https://react.dev) 19 (interactive components via Astro islands) |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com) 4 (`@tailwindcss/vite` plugin) |
| **Components**     | [shadcn/ui](https://ui.shadcn.com) (Radix primitives + Lucide icons) |
| **CMS**            | [Sanity](https://sanity.io) (headless CMS, content fetched at build time) |
| **Hosting**        | [Netlify](https://netlify.com)                                    |
| **Carousel**       | [Embla Carousel](https://embla-carousel.com) with autoplay plugin |
| **Package Manager** | pnpm                                                             |

## Getting Started

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at http://localhost:4321
pnpm build            # SSG build — fetches Sanity data, outputs to dist/
pnpm preview          # Preview built site locally
pnpm astro            # Run astro CLI helpers
```

Required environment variables (see `.env`):

| Variable                   | Value     | Purpose                                    |
| -------------------------- | --------- | ------------------------------------------ |
| `PUBLIC_SANITY_PROJECT_ID` | `rpjmkqdf`| Sanity project identifier (public)         |
| `PUBLIC_SANITY_DATASET`    | `production` | Sanity dataset name (public)            |
| `SANITY_API_TOKEN`         | *(secret)* | Private token for build-time Sanity queries |

## Architecture

### Page Builder Pattern

`src/pages/index.astro` fetches a `page` document from Sanity at build time. The document's `pageBuilder` array controls which sections appear and in what order. Each section type maps to a component:

| Section Type             | Component                | Interactive? | Client Directive    |
| ------------------------ | ------------------------ | ------------ | ------------------- |
| `heroSection`            | `Hero.astro`             | Yes          | Inline `<script>`   |
| `aboutSection`           | `About.astro`            | No           | —                   |
| `servicesSection`        | `Services.astro`         | Yes          | `client:load`       |
| `workSection`            | `Work.astro`             | Yes          | `client:only`       |
| `whyUsSection`           | `WhyUs.astro`            | Yes          | `client:visible`    |
| `testimonialsSection`    | `Testimonials.astro`     | Yes          | `client:only`       |
| `contactSection`         | `Contact.astro`          | Yes          | `client:load`       |

If no Sanity content is available (e.g. fresh dataset), the page gracefully falls back to hardcoded defaults for every section.

### Astro + React Split

- **Astro components** (`.astro`): Static layout, section wrappers, SEO metadata. Zero client JS.
- **React components** (`.tsx`): Interactive widgets — services accordion, gallery carousel, testimonials carousel, contact form with validation.
- **Client directives**: Astro islands selectively hydrate only the interactive parts (`client:load`, `client:visible`, `client:only`).

### Sanity CMS

Two document types in the schema:

- **`siteSettings`** — Single document for global site configuration: top banner text, phone/email, navigation links, footer info, social links, copyright.
- **`page`** — Single page document with a `pageBuilder` array of typed section blocks (hero, about, services, work, why us, testimonials, contact).

Each section type has fields for title, description, images, and section-specific content (e.g. `servicesList` for the services accordion, `testimonials` for the testimonial carousel, `formLabels` for the contact form).

The Sanity Studio is built and served at `/studio`. In development, run:

```bash
npx sanity dev --port 3333
```

### Image Handling

Sanity images are fetched via `urlFor()` (from `src/lib/sanity.ts`), which returns a proxy URL through `/sanity-images/*`. A Netlify redirect rewrites these to the Sanity CDN, avoiding third-party cookies from Sanity's image domain. Each section also has a local fallback image in `src/images/`.

### Contact Form

The contact form is a fully client-side React component with:

- Netlify-native form handling (`data-netlify="true"`, hidden `form-name` field)
- Client-side validation (name, email, phone, address, ZIP, referral source)
- Inline field-level error messages
- Success toast notification
- Loading/error states with spinner

### Gallery

The "Our Work" section uses Embla Carousel with autoplay. Images come from Sanity with a fallback to local images in `src/images/work/`.

## Project Structure

```
src/
├── sanity/
│   └── schemas/            # Sanity document & section type definitions
│       ├── index.ts         # Schema re-exports
│       ├── site-settings.ts # Global site settings schema
│       ├── page.ts          # Page document (pageBuilder array)
│       └── sections.ts      # All section type schemas
├── components/
│   ├── ui/                  # shadcn/ui primitives (button, card, accordion, carousel, etc.)
│   ├── layout/              # TopBanner, Footer, Logo
│   ├── sections/            # One .astro wrapper per section + React interactives
│   ├── section-wrapper.astro # Reusable section container
│   └── section-heading.astro # Reusable section title/number/description
├── lib/
│   ├── sanity.ts            # Sanity client + urlFor() image helper (CDN proxy)
│   ├── queries.ts           # GROQ queries (siteSettings, page)
│   ├── utils.ts             # cn() utility (clsx + tailwind-merge)
│   └── phone-formatting.ts  # Phone number helpers
├── images/                  # Local image fallbacks
├── layouts/Layout.astro     # Root HTML layout (head, top banner, slot, footer)
├── pages/
│   └── index.astro          # Main page — fetches Sanity, renders pageBuilder
└── styles/global.css        # Global CSS + theme tokens (@theme inline)
```

Root config files:

| File                   | Purpose                              |
| ---------------------- | ------------------------------------ |
| `astro.config.mjs`     | Astro config (React, Netlify, Tailwind) |
| `sanity.config.ts`     | Sanity Studio config                 |
| `sanity.cli.ts`        | Sanity CLI config                    |
| `netlify.toml`         | Netlify deploy + image proxy redirects |
| `tsconfig.json`        | TypeScript config (`@/*` path alias) |
| `components.json`      | shadcn/ui component config           |
| `.prettierrc`          | Prettier formatting (Astro + Tailwind) |
| `.gitignore`           | Ignored files (build output, env, etc.) |
| `AGENTS.md`            | Agent/IDE instructions for this project |

## Development Notes

### Code Style

- TypeScript strict mode, React JSX with `react-jsx` transform
- Named exports for React components (avoid default exports except for top-level page components)
- Prettier configured with Astro and Tailwind plugins
- Path alias `@/*` maps to `./src/*`

### Sanity Image Proxy

The custom `urlFor()` helper wraps Sanity's image URL builder to replace the CDN origin (`https://cdn.sanity.io/images/`) with a local proxy path (`/sanity-images/`). Netlify rewrites these requests back to the Sanity CDN, avoiding third-party cookies while keeping the benefits of Sanity's image pipeline (format conversion, resizing, hotspot cropping).

### Local Fallbacks

When Sanity data is unavailable (fresh dataset, offline, missing env vars), every section degrades gracefully to hardcoded content with local fallback images in `src/images/`. This allows the site to build and render without any Sanity connection.

### Build & Deploy

The Netlify build command (`netlify.toml`) compiles the Sanity Studio into `public/studio/`, runs a path-fixing script, then builds the Astro site. On deploy, `[[redirects]]` rules proxy `/sanity-images/*` to the Sanity CDN.

## License

MIT
