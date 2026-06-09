# Admin Dashboard — Analytics, Users & Subscriptions

**Content authoring is handled by Nuxt Studio. This doc covers only the custom admin pages.**

> **Related**: [Architecture Overview](./architecture.md), [Content Model](./content-model.md)

## Core Decision

**Nuxt Studio for ALL content AND media. Custom admin for data analytics only.**

Studio handles: MD content (blog + courses), exercise definitions (via Zod form editor), and ALL media (images, audio, video) uploaded to R2 via NuxtHub blob storage. The custom admin only covers what Studio cannot: D1-backed analytics, user management, and subscriptions.

### What Studio handles

- **Content**: Blog posts, course pages, lesson content (MD files)
- **Exercises**: QCM, graphical, code challenge definitions via form-based editor
- **Images**: Exercise screenshots → R2 via NuxtHub blob
- **Audio**: Lesson audio files → R2 via NuxtHub blob
- **Video**: MP4 files → R2 via NuxtHub blob (MVP course videos)
- **Git**: Commits directly from production
- **Preview**: Real-time MDC component preview

### What custom admin handles

- **Analytics**: Student progress, pass rates, time spent, adaptive mastery heatmaps
- **Exercise performance**: Which exercises are too hard/easy
- **Users**: Role management, account support
- **Subscriptions**: Stripe integration, plan changes
- **Cloudflare Stream**: Video upload helper for adaptive streaming (Phase 2)

## Architecture

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Nuxt App                                           │
│                                                     │
│  Nuxt Studio (for content):                         │
│  /__studio → Blog, courses, lessons, exercises, media │
│                                                     │
│  Custom Admin (for data):                           │
│  /admin/*  ← Protected by auth middleware           │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Analytics                                    │   │
│  │  • Student progress per course               │   │
│  │  • Exercise pass rates                       │   │
│  │  • Adaptive mastery heatmap                  │   │
│  │  • Time spent per lesson                     │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  User Management                              │   │
│  │  • Roles (student/admin/author)              │   │
│  │  • Account management                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Subscriptions                                │   │
│  │  • Plan management                           │   │
│  │  • Stripe integration                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Media (advanced)                             │   │
│  │  • Video upload to Cloudflare Stream         │   │
│  │  • Audio bulk upload to R2                   │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Route Structure

```
pages/admin/
├── index.vue                  # Dashboard: overview stats
├── courses/
│   ├── index.vue              # Course list
│   ├── [slug]/
│   │   ├── index.vue          # Course editor (meta)
│   │   └── lessons/
│   │       ├── index.vue      # Lesson list (reorderable)
│   │       └── [lessonSlug]/
│   │           ├── index.vue  # Lesson editor (MD content + exercises)
│   │           └── exercises/
│   │               ├── create.vue   # New exercise wizard
│   │               └── [exerciseId].vue  # Exercise editor
│   └── create.vue             # New course form
├── media/
│   └── index.vue              # Media library (R2 browser)
├── analytics/
│   └── index.vue              # Stats dashboard
└── users/
    └── index.vue              # User management (future)
```

## Auth Protection

```typescript
// middleware/admin.ts
export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = useAuth()

  if (!session.value) {
    return navigateTo('/login?redirect=' + useRoute().fullPath)
  }

  if (session.value.user.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }
})
```

Applied to all `/admin/**` routes:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/admin/**': { middleware: ['auth', 'admin'] }
  }
})
```

## Course Editing Workflow

### 1. Create a Course

```
Form fields:
├── Title (text)
├── Slug (auto-generated from title, editable)
├── Description (textarea)
├── Difficulty (select: beginner | intermediate | advanced)
├── Tags (multi-select chips)
├── Prerequisites (multi-select, from existing courses)
├── Image (upload to R2)
└── Published (toggle)

On save → creates content/courses/{slug}/index.md
```

### 2. Create a Lesson

```
Form fields:
├── Title (text)
├── Order (auto-incremented)
├── Duration (number, in minutes)
├── Content (Markdown editor with MDC preview)
│   └── TipTap or Monaco with MDX highlighting
├── Video (upload to Stream or paste YouTube URL)
├── Audio (upload to R2, or record in-browser)
├── Transcript (textarea or toggle to auto-generate)
└── Published (toggle)

On save → creates content/courses/{slug}/{order}-{lessonSlug}/index.md
```

### 3. Add an Exercise

**Exercise type selector:**
```
┌─────────────────────────────────────────────┐
│  Choose exercise type:                      │
│                                             │
│  [QCM]           Multiple choice quiz       │
│  [Graphical]     CSS layout visual question │
│  [Code Challenge] In-browser coding test    │
│  [Open Question] Text-based answer          │
└─────────────────────────────────────────────┘
```

#### QCM Exercise Form

```yaml
# Fields:
- id: string (auto-generated)
- question: Markdown text
- options:
    - Option 1 text
    - Option 2 text [+ Add option]
- correct: number (select which option is right)
- explanation: Markdown (shown after answering)
- points: number (default: 10)
- hints: string[] (optional, shown if user gets wrong)
```

#### Code Challenge Form

```yaml
# Fields:
- id: string (auto-generated)
- title: string
- description: Markdown (what to build)
- language: select (html-css | javascript | vue)
- starter files:
    - index.html (code editor)
    - style.css (code editor)
    [+ Add file]
- test suite:
    - name: "nav uses display:flex"
      type: css-property
      selector: "nav"
      property: "display"
      expected: "flex"
    [+ Add test]
- solution files: (same structure as starter, shown on "Show Solution")
- hints: string[]
- points: number (default: 30)
```

#### Graphical Exercise Form

```yaml
# Fields:
- id: string (auto-generated)
- question: text
- image: file upload → R2
- options: string[]
- correct: number
- explanation: Markdown
- points: number
```

### 4. Reorder & Publish

- **Reorderable list** (drag & drop via `@vueuse/integrations` sortable) for lessons within a course
- **Publish/unpublish** toggle — sets `published: false` in frontmatter, course hidden from students
- **Preview** — "View as student" button opens course page in new tab

## Writing MD Content

For rich lesson content, use a **Markdown editor with live preview**:

```typescript
// Option A: TipTap (recommended for Nuxt)
// @nuxt/ui-pro includes a TipTap editor component
// Supports: MDC blocks (::note, ::callout), code blocks with syntax highlighting

// Option B: Monaco with MD language
// Same editor used for code, with markdown language mode
// Less WYSIWYG, better for MDX/MDC power users
```

**Recommended**: TipTap with custom MDC node extensions. Authors can insert `::qcm{id="..."}`, `::code-challenge{id="..."}`, `::graphical{id="..."}` blocks via a toolbar.

## Media Upload

```
┌──────────────────────────────────┐
│  Media Upload                    │
│                                  │
│  [Drop files here or click]      │
│                                  │
│  Upload to:                      │
│  ○ Exercise screenshots → R2    │
│  ○ Audio files → R2            │
│  ○ Course images → R2          │
│  ● Video → Cloudflare Stream   │
│                                  │
│  ┌──────────────────────────┐   │
│  │ flexbox-layout.png  ✓    │   │
│  │ hello-world.mp3      ↗   │   │
│  └──────────────────────────┘   │
└──────────────────────────────────┘
```

Upload flow:
1. Client calls `GET /api/admin/upload-url?filename=X&contentType=Y`
2. Server generates presigned R2 URL or Stream direct upload URL
3. Client uploads directly to R2/Stream (bypasses Worker)
4. Client confirms upload → server stores reference

## Analytics Dashboard

```typescript
// server/api/admin/analytics.get.ts
export default defineEventHandler(async (event) => {
  const session = await requireAdmin(event)

  // Course stats
  const courseStats = await db.select({
    courseSlug: schema.courseProgress.courseSlug,
    enrolled: count(schema.courseProgress.userId),
    completed: sum(
      case(
        when(eq(schema.courseProgress.status, 'completed'), 1)
      ).else(0)
    ),
    avgScore: avg(schema.courseProgress.score),
  }).from(schema.courseProgress)
    .groupBy(schema.courseProgress.courseSlug)

  // Exercise pass rates
  const exerciseStats = await db.select({
    exerciseId: schema.exerciseAttempts.exerciseId,
    totalAttempts: count(),
    passRate: avg(schema.exerciseAttempts.passed.as('real')),
  }).from(schema.exerciseAttempts)
    .groupBy(schema.exerciseAttempts.exerciseId)

  return { courseStats, exerciseStats }
})
```

**Dashboard UI shows:**
- Total students enrolled per course
- Completion rate (% who finished all lessons)
- Average score per course
- Exercise pass rates (which exercises are too hard?)
- Recent activity feed

## Alternative: Nuxt Studio for Blog + Custom for Courses

**Don't try to make Nuxt Studio handle structured exercises.** The tool is designed for editing MD files. For QCM options, test suites, and media uploads, a purpose-built UI is the right call.

The admin panel is just another set of Vue pages in the same Nuxt app. Protected by middleware. Zero infrastructure overhead.

## Future: External CMS

If the platform grows to have multiple non-technical authors:

- **Directus** — open-source, self-hosted, custom fields
- **Payload CMS** — TypeScript-native, runs on Cloudflare
- **Strapi** — popular but heavier

For a solo/small-team MVP, a custom admin in Nuxt is sufficient and avoids the overhead of running a separate CMS.

## Open Questions

- [OPEN] TipTap vs Monaco for MD content editing? TipTap is WYSIWYG (better for non-technical authors). Monaco is power-user (better for dev authors).
- [OPEN] Should exercise definitions (QCM options, tests) be edited inline in MD (YAML frontmatter) or in a separate form? Inline keeps everything in one file. Separate form gives better UX.
- [OPEN] Is `@nuxt/ui-pro` worth it for the admin panel, or build from scratch with Nuxt UI free tier?
