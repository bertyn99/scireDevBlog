# User System — Auth, Database & Progress

**Related**: [Architecture Overview](../architecture.md), [Content Model](../content-model.md)

## Principle

D1 stores only **per-user mutable state**. Course content (lessons, exercises, metadata) lives in MD files via Nuxt Content. The linking mechanism: lesson slugs from the filesystem (e.g., `css-fundamentals/02-flexbox`) are stored as foreign keys in D1.

## Database Schema (D1 + Drizzle ORM)

```typescript
// server/db/schema/users.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),         // Better Auth user ID (UUID)
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

// server/db/schema/sessions.ts — handled by Better Auth
// Better Auth manages its own sessions table

// server/db/schema/course_progress.ts
export const courseProgress = sqliteTable('course_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  courseSlug: text('course_slug').notNull(),   // e.g., "css-fundamentals"
  status: text('status').notNull()             // 'not_started' | 'in_progress' | 'completed'
    .default('not_started'),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  lastAccessedAt: integer('last_accessed_at', { mode: 'timestamp' }),
})

// server/db/schema/lesson_progress.ts
export const lessonProgress = sqliteTable('lesson_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  lessonSlug: text('lesson_slug').notNull(),   // e.g., "css-fundamentals/02-flexbox"
  status: text('status').notNull()
    .default('not_started'),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  // Composite uniqueness: one progress row per user per lesson
}, (table) => ({
  userLessonUnique: uniqueIndex('user_lesson_idx')
    .on(table.userId, table.lessonSlug),
}))

// server/db/schema/exercise_attempts.ts
export const exerciseAttempts = sqliteTable('exercise_attempts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  lessonSlug: text('lesson_slug').notNull(),
  exerciseId: text('exercise_id').notNull(),   // e.g., "css-fundamentals/02-flexbox#flexbox-qcm-1"
  exerciseType: text('exercise_type').notNull(), // 'qcm' | 'code' | 'graphical' | 'open'
  code: text('code'),                    // JSON: user's submitted code (for code exercises)
  answer: text('answer'),                // User's answer (for QCM, graphical)
  passed: integer('passed', { mode: 'boolean' }).notNull(),
  score: integer('score').notNull(),     // Number of tests passed
  totalTests: integer('total_tests'),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }).notNull(),
})

// server/db/schema/subscriptions.ts (future)
export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: text('plan').notNull(),         // 'free' | 'pro' | 'team'
  status: text('status').notNull(),     // 'active' | 'canceled' | 'past_due'
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
```

## Authentication — Better Auth

Better Auth is the recommended choice because:
- D1-native (no separate auth database needed)
- Self-hosted (no Clerk/Auth0 vendor lock-in)
- Session-based (works naturally with Cloudflare Workers)
- You have the `better-auth` and `nuxt-better-auth` skills

```typescript
// server/utils/auth.ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    // google: { ... }  // future
  },
})
```

**Nuxt integration** via `@onmax/nuxt-better-auth`:
- `useUserSession()` composable for client-side auth state
- Server middleware for route protection
- Auto-generated auth API routes

```typescript
// middleware/auth.ts — protect admin routes
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo('/auth/login')
  }
})
```

## Progress Tracking

### Marking a Lesson as "Started"

```typescript
// server/api/progress/lesson/start.post.ts
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  const { lessonSlug, courseSlug } = await readBody(event)

  // Upsert lesson progress
  await db.insert(lessonProgress).values({
    userId: session.user.id,
    lessonSlug,
    status: 'in_progress',
    startedAt: new Date(),
  }).onConflictDoUpdate({
    target: [lessonProgress.userId, lessonProgress.lessonSlug],
    set: { status: 'in_progress' },
  })

  // Also mark course as in_progress
  await db.insert(courseProgress).values({
    userId: session.user.id,
    courseSlug,
    status: 'in_progress',
    startedAt: new Date(),
  }).onConflictDoUpdate({
    target: [courseProgress.userId, courseProgress.courseSlug],
    set: { status: 'in_progress' },
  })

  return { success: true }
})
```

### Completing a Lesson

After all exercises in a lesson are passed:

```typescript
// server/api/progress/lesson/complete.post.ts
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  const { lessonSlug } = await readBody(event)

  await db.update(lessonProgress)
    .set({ status: 'completed', completedAt: new Date() })
    .where(and(
      eq(lessonProgress.userId, session.user.id),
      eq(lessonProgress.lessonSlug, lessonSlug),
    ))

  // Check if all lessons in course are completed → mark course complete
  // ...

  return { success: true }
})
```

### Retrieving Progress for a Course

```typescript
// server/api/progress/course/[slug].get.ts
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  const courseSlug = getRouterParam(event, 'slug')

  // Get all lessons for the course (from Nuxt Content)
  const lessons = await queryCollection('lessons')
    .where('course', '=', courseSlug)
    .order('order', 'ASC')
    .all()

  // Get progress for those lessons
  const progress = await db.select()
    .from(lessonProgress)
    .where(and(
      eq(lessonProgress.userId, session.user.id),
      inArray(lessonProgress.lessonSlug, lessons.map(l => l._path)),
    ))

  // Merge: lesson data + progress status
  return lessons.map(lesson => ({
    ...lesson,
    progress: progress.find(p => p.lessonSlug === lesson._path) ?? {
      status: 'not_started',
    },
  }))
})
```

## Progress Data Flow

```
User opens lesson
  → POST /api/progress/lesson/start  { lessonSlug, courseSlug }
  → D1: lesson_progress.status = 'in_progress'

User completes exercise (client-side tests pass)
  → POST /api/progress/exercise/submit { lessonSlug, exerciseId, code, results }
  → Server re-validates
  → D1: exercise_attempts (insert new row)
  → If all exercises in lesson passed:
      → D1: lesson_progress.status = 'completed'

User views course page
  → GET /api/progress/course/[slug]
  → Returns: lessons[] + progress status for each
  → UI renders: ✅ completed, 🔵 in progress, ⬜ not started
```

## Open Questions

- [OPEN] Stripe integration for subscriptions? In scope for Phase 1 or later?
- [OPEN] GitHub OAuth only, or email/password too? Better Auth supports both.
- [OPEN] Should we track time spent on each lesson (stopwatch-style)?
- [OPEN] Public progress? (e.g., public profile showing completed courses)
