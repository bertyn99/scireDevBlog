# AGENTS.md — ScireDev Blog

## Project Overview

Nuxt 4 full-stack app (SSR + hybrid rendering) for an educational dev blog with courses, exercises (QCM, code challenges, graphical, open questions), and adaptive learning. Deploys to Cloudflare via NuxtHub.

## Design Source

**Figma file**: https://www.figma.com/design/Hyy5RyXmb1PkeXMySWBi3U/scireDev

Contains the full UI design system: page layouts, components (NavBar, Hero, article cards, exercise widgets, course cards), color tokens, and article cover templates. Use `get_design_context` with node IDs from this file when implementing or matching UI to designs. Article covers follow the `OgImage` component pattern — check `app/components/OgImage/` for the Vue implementation and `content.config.ts` for OG image field schemas.

## Commands

```bash
pnpm install          # requires --shamefully-hoist (set in .npmrc)
pnpm dev              # dev server on :3000
pnpm build            # production build
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm db:generate      # drizzle-kit generate (D1 migrations)
pnpm db:migrate       # drizzle-kit migrate
pnpm db:studio        # drizzle-kit studio
```

No test runner is configured.

## Architecture

```
app/                  # Nuxt 4 app directory (not root-level pages/components)
  pages/              # file-based routing
    admin/            # client-only (ssr: false)
    auth/             # client-only (ssr: false)
    blog/
    courses/
    tools/
  components/
    article/          # blog article rendering
    exercise/         # interactive exercise components (QCM, code challenges, graphical)
    content/          # Nuxt Content rendering helpers
    carrousel/
    section/
    OgImage/
  composables/
    loadMeta.ts       # SEO meta helper
    useMonaco.ts      # Monaco editor integration
    useSandbox.ts     # code sandbox for exercises
  layouts/            # default, blog, auth
  middleware/          # auth.ts (session check), brokenLinkRedirection.ts
  content/            # @nuxt/content v3 markdown source files
    blog/             # blog posts
    courses/          # course index + lessons
    components/       # CMS data (featured articles, etc.)
  assets/css/main.css # Tailwind v4 entry + custom theme tokens
  app.config.ts       # UI colors: primary=orange, neutral=zinc
server/
  auth.ts             # better-auth setup (email+password + GitHub OAuth)
  db/
    index.ts          # Drizzle ORM factory — uses D1 binding
    schema/           # users, progress, adaptive, subscriptions
  api/
    auth/             # auth endpoints
    adaptive/         # adaptive learning engine API
    progress/         # exercise/lesson progress tracking
  utils/
    adaptive-engine.ts
shared/utils/          # shared between client and server (format.ts)
content.config.ts      # @nuxt/content v3 collection definitions
```

## Key Tech & Conventions

- **Nuxt 4** with `compatibilityDate: '2025-06-01'` — app sources live under `app/`, not at project root
- **@nuxt/content v3** — collections defined in `content.config.ts` (blog, courses, lessons, paths, components, content). Uses `queryCollection()` API, not the old `queryContent()`
- **@nuxt/ui v4** — wraps app in `<UApp>`, uses Tailwind v4. Theme colors set in `app/app.config.ts` (primary=orange, neutral=zinc). Custom CSS tokens in `main.css`
- **Tailwind v4** — imported via `@import "tailwindcss"` in `main.css`, custom breakpoints (`--breakpoint-xs: 450px`) and brand colors via `@theme`
- **NuxtHub** — Cloudflare bindings (D1, R2, KV, Cache). Database access via `hubDatabase()` or `event.context.cloudflare.env.DB`
- **Drizzle ORM** — schemas in `server/db/schema/`, uses `drizzle-orm/d1` adapter. `Db` type exported from `server/db/index.ts`
- **better-auth** — configured in `server/auth.ts`, Drizzle adapter with SQLite provider. Supports email+password and GitHub OAuth
- **@nuxtjs/seo** — site config, schema.org, sitemap, og-image. SEO meta set via `useSeoMeta()` + `useSchemaOrg()` + `defineOgImage()`

## Rendering Strategy (routeRules)

| Route | Strategy |
|---|---|
| `/` | prerender (static) |
| `/blog/**` | ISR 3600s + SWR |
| `/courses` | ISR 300s + SWR |
| `/courses/**` | ISR 60s + SWR |
| `/api/**` | no cache |
| `/admin/**`, `/auth/**` | client-only (SSR disabled) |

## Content Collections Schema

Defined in `content.config.ts`. Key fields:

- **blog**: title, description, image, author, category, createdAt, tags
- **courses**: title, difficulty (beginner|intermediate|advanced), duration, published, order
- **lessons**: course slug, order, exercises array (discriminated union: qcm | graphical | code_challenge | open_question), video/audio optional
- **paths**: stages with course lists, estimatedHours, difficulty

## Database (D1)

- Migrations generated via `pnpm db:generate`, applied via `pnpm db:migrate`
- Schema files: `server/db/schema/{users,progress,adaptive,subscriptions}.ts`
- All tables use Drizzle's `sqliteTable()` with SQLite column types
- Access DB in server routes: `createDb(hubDatabase())` or via D1 binding

## Gotchas

- **No tests** — no vitest, no test scripts. Do not assume a test runner exists.
- **ESLint config is generated** — `eslint.config.mjs` imports from `.nuxt/eslint.config.mjs` which is auto-generated. Run `pnpm dev` once before linting if `.nuxt/` is missing.
- **TypeScript extends `.nuxt/tsconfig.json`** — generated by Nuxt. Must run `pnpm dev` or `nuxt prepare` first for type checking to work.
- **pnpm with shamefully-hoist** — required, set in `.npmrc`. Do not remove.
- **Content is file-based** — blog posts and courses are `.md` files under `app/content/`, not in a database. Frontmatter must match schemas in `content.config.ts`.
- **Icon collections** — `uil`, `mdi`, `bxl`, `heroicons` bundled server-side (configured in `nuxt.config.ts` icon.serverBundle)
- **nuxt-umami** — analytics via Umami, config from env vars (`NUXT_UMAMI_ID`, `NUXT_UMAMI_HOST`), uses proxy mode `'cloak'`
- **evlog** — structured logging, only active on `/api/**` routes

## Environment Variables

Required in `.env` (not committed):
- `NUXT_PUBLIC_SITE_URL`
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
- `BETTER_AUTH_SECRET`, `SESSION_PASSWORD`
- `NUXT_UMAMI_ID`, `NUXT_UMAMI_HOST`
- `SEO_PRO_KEY`
