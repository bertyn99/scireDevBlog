# Architecture Overview

**Status**: 🟡 Design phase — converging toward implementation
**Last updated**: 2026-06-06

## Core Architecture Decision

**Content lives in Git (MD files). State lives in D1 (Cloudflare).**

Course materials — lessons, exercise definitions, metadata — are Markdown files versioned in Git. User-specific data — progress, exercise attempts, subscriptions, sessions, adaptive mastery — lives in Cloudflare D1.

Evidence: This hybrid pattern is used in production by Trivium, AI Educademy, TeachRepo, and Nuxt's own learn.nuxt.com. Nuxt Content v3's SQLite-backed collections make structured querying of MD content straightforward.

## Technology Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Nuxt 5 + Nitro v3 | Latest. Nitro v3 brings built-in SQL, KV, Tasks API. |
| **Content (courses)** | Nuxt Content v3 | MD/MDC files, Zod schemas, Git-versioned. |
| **Content (blog)** | Nuxt Content v2 → v3 | Existing blog stays file-based. |
| **Database** | Cloudflare D1 + Drizzle ORM | Type-safe SQLite at edge. User data only. |
| **Auth** | Better Auth + `nuxt-better-auth` | D1-native, self-hosted, session-based. |
| **UI** | Nuxt UI v3 + Tailwind CSS v4 | Component library, dark mode, forms. |
| **Code editor** | Monaco Editor | VS Code-grade. Used by learn.nuxt.com. |
| **Sandbox (MVP)** | iframe `srcdoc` | HTML/CSS exercises. Zero server cost. |
| **Sandbox (future)** | WebContainers | Full Node.js for Vue/Nuxt exercises. |
| **Video** | Cloudflare Stream (Phase 2) | MVP: MP4 in R2 via Studio media library + `<video>` tag. Stream only for adaptive bitrate later.
| **Assets** | Cloudflare R2 via Studio | Exercise screenshots, audio, video. All uploaded through Studio's media library with R2 external storage.
| **Image optimization** | Cloudflare Images | Auto WebP/AVIF, responsive variants. |
| **Cache** | KV | Session cache, rate limiting, metadata. |
| **Bot protection** | Turnstile | Signup/login forms, exercise submission. |
| **Logging** | evlog | Structured wide events, Nuxt-native, errors with `why`+`fix`. See [observability.md](./observability.md).
| **CSS validation (future)** | Browser Rendering | Screenshot diff for visual exercises. |
| **Content editing** | Nuxt Studio | Visual + form-based editor for MD files. Zod schemas auto-generate exercise forms. Self-hosted, open-source.

| **Analytics (admin)** | Custom Nuxt pages | D1-backed dashboard for student progress, exercise pass rates, user management. Studio doesn't cover this. |

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        Cloudflare Edge                           │
│                                                                  │
│  ┌────────────┐ ┌──────────┐ ┌────────┐ ┌────────┐ ┌─────────┐ │
│  │ Nuxt App   │ │   D1     │ │  R2    │ │ Stream │ │  KV     │ │
│  │ (Pages/    │ │ Users    │ │ Assets │ │ Video  │ │ Cache   │ │
│  │  Worker)   │ │ Progress │ │ Audio  │ │        │ │ RateLim │ │
│  │            │ │ Adaptive │ │ Images │ │        │ └─────────┘ │
│  │ • SSR      │ │ Subs     │ └────────┘ └────────┘             │
│  │ • API      │ └──────────┘                                    │
│  │ • Auth     │                                                  │
│  └─────┬──────┘                                                  │
│        │                                                         │
│  ┌─────▼──────┐ ┌──────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │  Images    │ │ Turnstile│ │   Queues     │ │   Browser    │ │
│  │  Optimize  │ │ Forms    │ │  Background  │ │  Rendering   │ │
│  │  Exercise  │ │ Auth     │ │  Processing  │ │  CSS diff    │ │
│  │  Screens   │ └──────────┘ └──────────────┘ │  (future)    │ │
│  └────────────┘                                └──────────────┘ │
└──────────────────────────────────────────────────────────────────┘
            │
     ┌──────▼──────┐
     │  Git Repo   │
     │             │
     │ courses/    │ ← MD files: courses, lessons, exercise defs
     │ paths/      │ ← Learning path definitions
     │ blog/       │ ← Existing blog posts
     │ curriculum/ │ ← Curriculum structure
     └─────────────┘
```

## Data Flow

```
Author writes MD ──► Git push ──► Nuxt Content builds ──► Course pages (ISR at edge)

User visits course ──► Nuxt SSR renders lesson MD
                       │
                       ├──► Static content from Nuxt Content
                       ├──► User progress from D1 (API call)
                       └──► Adaptive engine selects next exercise from D1

User submits exercise ──► Client-side sandbox runs tests
                          │
                          ├──► Pass? ──► POST /api/progress ──► D1
                          │                           │
                          │                    ┌──────▼───────┐
                          │                    │  Adaptive     │
                          │                    │  Engine       │
                          │                    │  Updates      │
                          │                    │  mastery +    │
                          │                    │  schedules    │
                          │                    │  next review  │
                          │                    └──────────────┘
                          │
                          └──► Fail? ──► Show errors, user retries
                                         Adaptive engine lowers difficulty
```

## Key Decisions

### 1. Nuxt Content v3 for courses (not D1)
Course content is documentation. Git versioning, diffing, PR review, and author-friendly Markdown beat database forms. Nuxt Content v3 collections with Zod schemas provide structured querying via SQLite.

### 2. D1 only for per-user mutable state
Users, sessions, progress, exercise attempts, subscriptions, adaptive mastery scores. These change per-user. The lesson `slug` from the MD filename links progress to content.

### 3. Adaptive exercise engine
Track mastery per concept using threshold-based scoring (MVP) → Bayesian Knowledge Tracing (Phase 2). Weak concepts get more exercises. Strong concepts get scheduled reviews. See `exercise-engine/adaptive.md`.

### 4. Learning paths, not just courses
Courses are shared across curated paths (Frontend Engineer, Full-Stack Nuxt, CSS Specialist). Students pick a path → follow the sequence → adaptive engine routes within each course. See `curriculum.md`.

### 5. Subscriber-gated value, not subscriber-gated code
Course code is public (GitHub repos). The value proposition is: adaptive exercise engine, video content, build-along solutions, project feedback. Same model as FrontendMasters, egghead.io, Laracasts.

### 6. Client-side sandbox for MVP exercise engine
iframe `srcdoc` for HTML/CSS exercises. WebContainers later for Vue/Nuxt. Evolution from StackBlitz SDK (prototype) → self-contained sandbox (MVP) → full Node.js sandbox (Phase 2).

### 7. Nitro v3 — critical breaking change
`event.context.cloudflare.env` → `event.req.runtime.cloudflare.env`. Every D1/KV/R2 call must use the new pattern. Package renamed from `nitropack` to `nitro`. SWR is now opt-in.

### 8. Monorepo with single exercise-engine layer
Exercise engine is a **Nuxt layer** in `packages/exercise-engine/`. Contains: types, validators, components, composables, server routes, tests, and its own playground. Main app extends it via `extends: ['../packages/exercise-engine']`. Independently testable with Vitest. See `exercise-engine/architecture.md`.
## Repository Structure

```
scireDev/
├── apps/
│   └── web/                              # Main Nuxt app
│       ├── nuxt.config.ts                # extends: ['../packages/exercise-engine']
│       ├── package.json
│       │
│       ├── content/
│       │   ├── courses/                  # Nuxt Content v3 — course content
│       │   │   ├── javascript-basics/
│       │   │   │   ├── index.md
│       │   │   │   ├── 01-variables-types/
│       │   │   │   │   ├── index.md      # Lesson + embedded exercises
│       │   │   │   │   └── .template/    # Exercise template files
│       │   │   │   └── ...
│       │   │   ├── vue-fundamentals/
│       │   │   └── ...
│       │   ├── paths/                    # Learning path definitions
│       │   │   ├── frontend-engineer.md
│       │   │   ├── fullstack-nuxt.md
│       │   │   └── css-specialist.md
│       │   └── blog/                     # Existing blog (unchanged)
│       │
│       ├── pages/
│       │   ├── courses/[...slug].vue     # Dynamic course/lesson pages
│       │   ├── paths/                    # Learning path pages
│       │   ├── auth/                     # Login, register
│       │   └── admin/                    # Protected admin
│       │
│       ├── server/
│       │   ├── api/
│       │   │   ├── auth/                 # Better Auth endpoints
│       │   │   ├── progress/             # User progress CRUD
│       │   │   ├── adaptive/             # Next exercise, mastery scores
│       │   │   └── projects/             # Subscriber code access
│       │   ├── db/schema/                # Drizzle ORM schemas
│       │   │   ├── users.ts
│       │   │   ├── progress.ts
│       │   │   ├── adaptive.ts           # Mastery, spacing, concepts
│       │   │   └── subscriptions.ts
│       │   └── utils/
│       │       ├── adaptive-engine.ts    # Mastery calculation, routing
│       │       └── exercise-validator.ts # Server-side re-validation
│       │
│       ├── components/
│       │   └── content/                  # MDC prose components
│       │
│       ├── composables/
│       │   ├── useAdaptiveProgress.ts    # Client-side mastery display
│       │   └── useSubscriber.ts          # Subscription checks
│       │
│       ├── content.config.ts
│       └── wrangler.toml
│
└── packages/
    └── exercise-engine/                  # Single Nuxt layer
        ├── nuxt.config.ts                # Layer config
        ├── package.json                  # Layer dependencies
        ├── vitest.config.ts              # Independent testing
        │
        ├── types/                        # Shared types
        │   ├── exercise.ts               # ExerciseMeta, CheckpointEvent, etc.
        │   └── index.ts
        │
        ├── utils/                        # Pure logic (validators, helpers)
        │   ├── validators.ts             # CSS/DOM assertion runners
        │   ├── assertions.ts             # Test case types + runners
        │   └── index.ts
        │
        ├── composables/                  # Exercise composables
        │   ├── useCheckpoint.ts          # Event-driven checkpoint system
        │   ├── useMonaco.ts              # Monaco editor wrapper
        │   ├── useSandbox.ts             # iframe sandbox + test runner
        │   └── useExerciseTracker.ts     # Progress tracking composable
        │
        ├── components/                   # Exercise components
        │   ├── stateless/                # Tier 1: Stateless demos
        │   │   ├── StatelessExercise.vue
        │   │   ├── FlexboxPlayground.vue
        │   │   └── registry.ts
        │   ├── checkpoint/               # Tier 2: Checkpoint exercises
        │   │   ├── CheckpointExercise.vue
        │   │   ├── QcmExercise.vue
        │   │   └── GraphicalExercise.vue
        │   ├── workspace/                # Tier 3: WebContainers
        │   │   ├── CodeChallenge.vue
        │   │   ├── CodeEditor.vue
        │   │   └── CodePreview.vue
        │   └── sandbox/                  # Tier 4: Cloudflare Sandbox
        │       └── SandboxExercise.vue
        │
        ├── server/                       # Server routes (optional)
        │   └── api/exercise/
        │       └── validate.post.ts      # Server-side validation
        │
        ├── playground/                   # Dev playground (excluded in prod)
        │   ├── nuxt.config.ts
        │   ├── app.vue
        │   └── pages/
        │       ├── index.vue             # Exercise type selector
        │       ├── stateless/
        │       ├── checkpoint/
        │       └── workspace/
        │
        └── test/                         # Tests
            ├── unit/
            │   ├── validators.test.ts
            │   └── assertions.test.ts
            └── nuxt/
                ├── stateless.test.ts
                ├── checkpoint.test.ts
                └── workspace.test.ts
```

## What We're NOT Building (yet)

- Real-time collaborative coding (Durable Objects)
- Cohort-based learning / live sessions
- Gamification / leaderboards / badges
- Course certificates
- AI-powered exercise evaluation
- Mobile apps

## Open Questions

- [OPEN] NuxtHub vs direct Cloudflare Pages? NuxtHub is faster to set up. Direct gives more control.
- [OPEN] Monaco Editor: `@guolao/vue-monaco-editor` or raw setup?
- [OPEN] Admin dashboard: custom-built vs extend Nuxt Studio?
- [OPEN] Stripe integration in Phase 1 or Phase 2?

## Related Documents

| Doc | Content |
|---|---|
| [curriculum.md](./curriculum.md) | Full learning paths, course catalog, capstone projects |
| [content-model.md](./content-model.md) | MD file structure, frontmatter schemas, MDC components |
| [exercise-engine/architecture.md](./exercise-engine/architecture.md) | Sandbox design, test runner, Monaco integration |
| [exercise-engine/adaptive.md](./exercise-engine/adaptive.md) | Adaptive routing, mastery tracking, spaced repetition |
| [user-system/database.md](./user-system/database.md) | D1 schemas, Better Auth, progress API, subscriptions |
| [deployment/cloudflare.md](./deployment/cloudflare.md) | NuxtHub, D1, R2, Stream, KV, Queues, Nitro v3 specifics |
| [admin-dashboard.md](./admin-dashboard.md) | Authoring workflow, media upload, analytics |
