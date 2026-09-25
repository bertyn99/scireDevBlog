# Core Platform Foundation — Phase 3 Plan

## TL;DR

> **Quick Summary**: Wire auth into all API routes, create DB migrations, build the student dashboard, course catalog, and QCM/graphical exercise components.
>
> **Deliverables**:
> - `drizzle.config.ts` + generated D1 migrations
> - `requireAuth(event)` helper on all API routes
> - Student dashboard at `/dashboard` with 6 widgets
> - Course catalog at `/courses`
> - QCM + Graphical exercise components in exercise-engine layer
> - 4 new progress API endpoints
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: T1 (drizzle) → T3 (auth wiring) → T6 (API endpoints) → T8 (dashboard)

---

## Context

### Original Request
Build the core platform foundation so the app is usable by real logged-in students.

### Current State
- DB schemas exist (users, sessions, accounts, progress, adaptive) but NO migrations generated
- Better-auth configured but all 7 API routes use `userId: 'temp'`
- 1 exercise component (CodeChallenge.vue) — missing QCM and graphical
- Course/lesson pages exist but no progress tracking UI
- No dashboard, catalog, or learning paths pages
- evlog logging already in all routes

### Key Decisions
- **Exercise components** go in the exercise-engine layer (`packages/exercise-engine/app/components/`)
- **Better-auth** manages its own tables — drizzle.config.ts must include all schema files
- **Build QCM + graphical** this phase (open question deferred)
- **Learning paths** — basic page reading from content, not full path enrollment system
- **Adaptive engine** APIs exist, just need auth wiring (no refactoring)

---

## Work Objectives

### Core Objective
Transform the app from "works with hardcoded temp user" to "works with real authenticated students tracking real progress."

### Must Have
- `drizzle.config.ts` that generates valid D1 migrations
- `requireAuth(event)` helper returning `{ user, session }`
- All 7 existing API routes use real session user ID (not `'temp'`)
- `/dashboard` page with: Continue Learning, Course Progress, Skill Mastery, Review Queue, Activity Feed
- `/courses` catalog page (public)
- QCM exercise component (`QcmExercise.vue`)
- Graphical exercise component (`GraphicalExercise.vue`)

### Must NOT Have (Guardrails)
- NO Stripe integration (Phase 4+)
- NO admin dashboard (separate phase)
- NO WebContainers/sandbox exercises (Phase 4+)
- NO open_question exercise type (deferred)
- NO path enrollment system (just display paths)
- NO changes to content.config.ts schemas
- NO changes to nuxt.config.ts modules

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (no test runner configured)
- **Automated tests**: NO
- **Agent-Executed QA**: YES — every task verified via `nuxt prepare`, curl, and browser checks

### QA Policy
Every task includes agent-executed QA scenarios.
- Frontend/UI: `nuxt prepare` type check + visual render verification
- API: curl with auth token verification
- DB: migration generation + SQL validation

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation):
├── Task 1: drizzle.config.ts + generate migrations [quick]
└── Task 2: requireAuth() helper + session utilities [quick]

Wave 2 (After Wave 1 — parallel build):
├── Task 3: Wire auth into all 7 existing API routes [unspecified-high]
├── Task 4: 4 new progress/dashboard API endpoints [unspecified-high]
├── Task 5: QCM exercise component [visual-engineering]
└── Task 6: Graphical exercise component [visual-engineering]

Wave 3 (After Wave 2 — pages):
├── Task 7: Course catalog page (/courses) [visual-engineering]
├── Task 8: Student dashboard page (/dashboard) [visual-engineering]
└── Task 9: Learning paths page (/paths) [quick]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
└── Task F2: Manual QA — full student flow (unspecified-high)

Critical Path: T1 → T3 → T4 → T8
Max Concurrent: 4 (Wave 2)
```

---

## TODOs

> **Status**: Plan written, awaiting `/start-work core-platform-foundation` to begin execution. This is a NEW plan — not yet activated.



- [x] 1. Create drizzle.config.ts and generate D1 migrations

  **What to do**:
  - Create `apps/web/drizzle.config.ts` with `dialect: 'sqlite'`, schema pointing to `./server/db/schema/*`, out `./server/db/migrations`
  - Run `pnpm --filter web db:generate` to generate initial migration
  - Verify SQL includes CREATE TABLE for all 8 tables

  **Must NOT do**: Do not modify schema files. Do not apply to remote D1.

  **Parallelization**: Wave 1 (parallel with Task 2)
  **Blocks**: Tasks 3, 4 (need DB tables to test against)
  **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `apps/web/drizzle.config.ts` exists with `dialect: 'sqlite'`
  - [ ] `apps/web/server/db/migrations/` contains at least one `.sql` file
  - [ ] Migration SQL has CREATE TABLE for users, sessions, accounts, course_progress, lesson_progress, exercise_attempts, concepts, user_mastery

  **QA Scenarios**:
  ```
  Scenario: Migration generates valid SQL
    Tool: Bash
    Steps:
      1. Run `pnpm --filter web db:generate`
      2. Check `apps/web/server/db/migrations/0000_*.sql` exists
      3. Grep for 'CREATE TABLE users' and 'CREATE TABLE exercise_attempts'
    Expected Result: Migration file exists with all CREATE TABLE statements
    Evidence: .omo/evidence/task-1-migrations.txt
  ```

- [x] 2. Setup auth (better-auth) + authorization (nuxt-authorization)

  **What to do**:

  **Part A — Better Auth migration:**
  - Install: `pnpm --filter web add @onmax/nuxt-better-auth`
  - Add to `nuxt.config.ts` modules: `'@onmax/nuxt-better-auth'`
  - Create `apps/web/server/auth.config.ts` (replaces `server/auth.ts`):
    ```typescript
    import { defineAuthConfig } from '#nuxt-better-auth'
    import { drizzleAdapter } from 'better-auth/adapters/drizzle'
    export default defineAuthConfig({
      database: drizzleAdapter(hubDb(), { provider: 'sqlite' }),
      emailAndPassword: { enabled: true },
      socialProviders: { github: { ... } },
      session: { expiresIn: 30 * 24 * 60 * 60 },
    })
    ```
  - Simplify `apps/web/server/api/auth/[...].ts` to use `serverAuth(event)` singleton
  - Delete `apps/web/server/auth.ts` (old factory removed)
  - Update `app/middleware/auth.ts` to use `useUserSession()`
  - Update `app/pages/auth/login.vue` to use `authClient.signIn.email()`

  **Part B — nuxt-authorization setup:**
  - Install: `npx nuxi module add nuxt-authorization`
  - Create `apps/web/plugins/authorization-resolver.ts` (client resolver):
    ```typescript
    export default defineNuxtPlugin({
      name: 'authorization-resolver',
      parallel: true,
      setup() {
        return {
          provide: {
            authorization: {
              resolveClientUser: () => useUserSession().user.value,
            },
          },
        }
      },
    })
    ```
  - Create `apps/web/server/plugins/authorization-resolver.ts` (server resolver):
    ```typescript
    export default defineNitroPlugin((nitroApp) => {
      nitroApp.hooks.hook('request', async (event) => {
        event.context.$authorization = {
          resolveServerUser: async () => {
            const session = await getUserSession(event)
            return session?.user ?? null
          },
        }
      })
    })
    ```
  - Create `shared/utils/abilities.ts` with platform abilities:
    ```typescript
    import { defineAbility } from '#nuxt-authorization'

    // Any authenticated user
    export const viewDashboard = defineAbility(() => true)
    export const accessCourse = defineAbility(() => true)
    export const submitExercise = defineAbility(() => true)
    export const trackProgress = defineAbility(() => true)

    // Admin only
    export const viewAdminPanel = defineAbility((user) => user.role === 'admin')
    export const manageUsers = defineAbility((user) => user.role === 'admin')

    // Author or admin
    export const editContent = defineAbility((user) => user.role === 'admin' || user.role === 'author')
    ```
  - Add `routeRules` in `nuxt.config.ts`:
    - `/dashboard/**`: `{ auth: { only: 'user', redirectTo: '/auth/login' } }`
    - `/admin/**`: `{ auth: { user: { role: 'admin' } } }`
  - Use `authorize(event, viewAdminPanel)` in admin API routes
  - Use `<Can :ability="editContent">` / `<Cannot>` / `<Bouncer>` components in Vue templates

  **Why both modules:**
  - **better-auth** = authentication (WHO are you?) — sessions, login, OAuth
  - **nuxt-authorization** = authorization (WHAT can you do?) — abilities, bouncer, `<Can>` components
  - They're complementary: nuxt-authorization's resolvers call better-auth's `getUserSession()`
  - Abilities are defined ONCE in `shared/utils/abilities.ts` and used on BOTH client and server

  **Must NOT do**:
  - Do not write a custom `requireAuth()` helper — use `requireUserSession(event)` from better-auth
  - Do not call `createAuth(db)` per request — use `serverAuth(event)` singleton
  - Do not modify the existing `users/sessions/accounts` Drizzle schemas
  - Do not implement RBAC or ACL system — nuxt-authorization provides low-level primitives only

  **Parallelization**: Wave 1 (parallel with Task 1)
  **Blocks**: Tasks 3, 4 (all routes need auth + abilities)
  **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `@onmax/nuxt-better-auth` AND `nuxt-authorization` installed
  - [ ] Both modules added to `nuxt.config.ts`
  - [ ] `apps/web/server/auth.config.ts` exists (better-auth config)
  - [ ] `apps/web/server/auth.ts` deleted
  - [ ] `apps/web/plugins/authorization-resolver.ts` exists (client resolver)
  - [ ] `apps/web/server/plugins/authorization-resolver.ts` exists (server resolver)
  - [ ] `shared/utils/abilities.ts` exists with 6+ abilities
  - [ ] `routeRules` added for `/dashboard/**` and `/admin/**`
  - [ ] Login form uses `authClient.signIn.email()`
  - [ ] `nuxt prepare` passes
  - [ ] `grep -r "createAuth" apps/web/server/` returns 0 matches
  - [ ] `grep -r "userId.*temp\|userId.*demo" apps/web/server/` returns 0 matches

  **QA Scenarios**:
  ```
  Scenario: Auth + authorization modules type-check
    Tool: Bash
    Steps:
      1. Run `pnpm --filter web exec nuxt prepare`
      2. Verify `requireUserSession`, `serverAuth`, `defineAbility`, `authorize`, `allows` are auto-imported
      3. Verify no TypeScript errors
    Expected Result: All types generate successfully
    Evidence: .omo/evidence/task-2-auth-authorization.txt

  Scenario: Abilities are defined and usable
    Tool: Bash
    Steps:
      1. Check `shared/utils/abilities.ts` exists with `defineAbility` calls
      2. Check `apps/web/plugins/authorization-resolver.ts` returns user from `useUserSession()`
      3. Check `apps/web/server/plugins/authorization-resolver.ts` returns user from `getUserSession(event)`
    Expected Result: Both resolvers wired, abilities defined
    Evidence: .omo/evidence/task-2-auth-authorization.txt
  ```


- [x] 3. Wire auth into all 7 existing API routes

  **What to do**:
  - Add `const { user } = await requireUserSession(event)` at top of each route (from `@onmax/nuxt-better-auth`)
  - Add `await authorize(event, submitExercise)` for exercise/progress routes (from `nuxt-authorization`)
  - Replace all `userId: 'temp'` with `userId: user.id`
  - Replace all `userId: 'demo-user'` with `userId: user.id`
  - Add try/catch with `log.error()` for 401/403 cases

  **Files to change** (all in `apps/web/server/api/`):
  - `progress/exercise/submit.post.ts` — `requireUserSession` + `authorize(event, submitExercise)`
  - `progress/lesson/start.post.ts` — `requireUserSession` + `authorize(event, trackProgress)`
  - `progress/lesson/complete.post.ts` — `requireUserSession` + `authorize(event, trackProgress)`
  - `adaptive/update.post.ts` — `requireUserSession` + `authorize(event, trackProgress)`
  - `adaptive/next-exercise.get.ts` — `requireUserSession` + `authorize(event, accessCourse)`
  - `adaptive/skill-map.get.ts` — `requireUserSession` + `authorize(event, trackProgress)`
  - `auth/[...].ts` — no change (auth handler is public)

  **Must NOT do**: Do not change route logic. Do not change return shapes.

  **Parallelization**: Wave 2 (parallel with Tasks 4, 5, 6)
  **Blocks**: Tasks 7, 8, 9 (pages need auth-secured data)
  **Blocked By**: Tasks 1, 2

  **Acceptance Criteria**:
  - [ ] `grep -r "userId.*temp\|userId.*demo" apps/web/server/` returns 0 matches
  - [ ] All routes (except auth handler) call `requireAuth(event)`
  - [ ] `nuxt prepare` passes

- [x] 4. Create 4 new progress/dashboard API endpoints

  **What to do**:
  - Create `GET /api/progress/courses` — all course progress for user
  - Create `GET /api/progress/last-lesson` — last accessed lesson
  - Create `GET /api/adaptive/review-queue` — concepts due for review
  - Create `GET /api/progress/activity` — recent activity feed
  - All endpoints use `requireAuth(event)` and `useLogger(event)`

  **Response shapes** (from student-dashboard.md):
  - `/api/progress/courses` → `[{ courseSlug, status, completedLessons, totalLessons, lastAccessedAt }]`
  - `/api/progress/last-lesson` → `{ lessonSlug, courseSlug, lessonTitle, status }`
  - `/api/adaptive/review-queue` → `[{ conceptTag, nextReviewAt, mastery }]`
  - `/api/progress/activity` → `[{ type, description, timestamp }]`

  **Must NOT do**: Do not create enrollment endpoints. Do not create mutation endpoints.

  **Parallelization**: Wave 2 (parallel with Tasks 3, 5, 6)
  **Blocks**: Task 8 (dashboard needs these endpoints)
  **Blocked By**: Tasks 1, 2

  **Acceptance Criteria**:
  - [ ] 4 new route files exist in `apps/web/server/api/`
  - [ ] All use `requireAuth(event)` and return JSON
  - [ ] All use evlog `useLogger(event)` with try/catch
  - [ ] `nuxt prepare` passes


- [x] 5. Build QCM exercise component

  **What to do**:
  - Create `packages/exercise-engine/app/components/checkpoint/QcmExercise.vue`
  - Props: `exerciseId`, `question`, `options` (string[]), `correct` (number), `explanation`, `conceptTags` (string[])
  - Emits `@completed` with `{ exerciseId, passed, selectedAnswer, conceptTags }`
  - Shows options as clickable cards, highlights correct/incorrect after submit
  - Uses `useCheckpoint` composable pattern for event-driven progress
  - Design: clean radio-style selection, immediate feedback, explanation panel

  **Must NOT do**: Do not build server-side validation (deferred to audit fix #1.3). Do not build open_question type.

  **Parallelization**: Wave 2 (parallel with Tasks 3, 4, 6)
  **Blocks**: None (component is auto-imported via layer)
  **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `packages/exercise-engine/app/components/checkpoint/QcmExercise.vue` exists
  - [ ] Component renders question + options
  - [ ] Selecting an option and clicking submit shows correct/incorrect feedback
  - [ ] `nuxt prepare` passes (component auto-imported as `CheckpointQcmExercise`)

- [x] 6. Build Graphical exercise component

  **What to do**:
  - Create `packages/exercise-engine/app/components/checkpoint/GraphicalExercise.vue`
  - Props: `exerciseId`, `image`, `question`, `options` (string[]), `correct` (number), `explanation`, `conceptTags`
  - Same interaction pattern as QCM but with an image displayed above the question
  - Image comes from public/ path (e.g., `/img/exercises/flexbox-layout.png`)
  - Emits `@completed` with same shape as QCM

  **Must NOT do**: Do not build screenshot diff comparison (future feature).

  **Parallelization**: Wave 2 (parallel with Tasks 3, 4, 5)
  **Blocks**: None
  **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `packages/exercise-engine/app/components/checkpoint/GraphicalExercise.vue` exists
  - [ ] Renders image + question + options
  - [ ] Submit shows feedback + explanation
  - [ ] Auto-imported as `CheckpointGraphicalExercise`


- [x] 7. Course catalog page (/courses)

  **What to do**:
  - Create `apps/web/app/pages/courses/index.vue` — public course catalog
  - Grid of course cards reading from `queryCollection('courses')`
  - Each card: title, description, difficulty badge, lesson count, progress bar (if logged in)
  - Progress data from `/api/progress/courses` endpoint (if authenticated)
  - Empty state: 'No courses available yet'

  **Must NOT do**: Do not build filtering/search (deferred). Do not build path enrollment.

  **Parallelization**: Wave 3 (after Wave 2)
  **Blocks**: None
  **Blocked By**: Tasks 3, 4 (for progress data)

  **Acceptance Criteria**:
  - [ ] `apps/web/app/pages/courses/index.vue` exists
  - [ ] Page renders course cards from Nuxt Content
  - [ ] Progress bars show for logged-in users
  - [ ] `nuxt prepare` passes

- [x] 8. Student dashboard page (/dashboard)

  **What to do**:
  - Create `apps/web/app/pages/dashboard.vue` — authenticated student hub
  - Create `apps/web/app/layouts/dashboard.vue` — compact navbar layout
  - Create 6 widget components in `apps/web/app/components/dashboard/`:
    - `ContinueLearning.vue` — hero card with resume button
    - `CourseProgress.vue` — enrolled courses grid
    - `SkillMastery.vue` — mastery bars panel
    - `ReviewQueue.vue` — spaced repetition items
    - `ActivityFeed.vue` — recent actions list
    - `StreakBadge.vue` — consecutive days indicator
  - Dashboard fetches from 4 API endpoints (Task 4)
  - Uses Nuxt UI v4 components (UCard, UProgress, UBadge, UButton)
  - Auth-protected: redirect to `/auth/login` if not authenticated

  **Design inspiration**: Tailwind UI Compass patterns — clean cards, progress indicators
  **Spec reference**: `docs/student-dashboard.md`

  **Must NOT do**: Do not build settings/billing UI. Do not build admin widgets.

  **Parallelization**: Wave 3 (after Wave 2)
  **Blocks**: None
  **Blocked By**: Tasks 3, 4 (needs auth + API endpoints)

  **Acceptance Criteria**:
  - [ ] `apps/web/app/pages/dashboard.vue` exists with 6 widgets
  - [ ] `apps/web/app/layouts/dashboard.vue` exists
  - [ ] 6 components in `apps/web/app/components/dashboard/`
  - [ ] Page redirects to `/auth/login` if unauthenticated
  - [ ] `nuxt prepare` passes

- [x] 9. Learning paths page (/paths)

  **What to do**:
  - Create `apps/web/app/pages/paths/index.vue` — public learning paths overview
  - Create `apps/web/app/pages/paths/[slug].vue` — path detail with course timeline
  - Path data comes from a `paths` content collection (MD files in `content/paths/`)
  - Each path: title, description, stages with courses, estimated hours
  - Show progress overlay if user is logged in

  **Must NOT do**: Do not build path enrollment/scheduling. Do not build all 20 courses.

  **Parallelization**: Wave 3 (after Wave 2)
  **Blocks**: None
  **Blocked By**: None (reads from content)

  **Acceptance Criteria**:
  - [ ] `apps/web/app/pages/paths/index.vue` exists
  - [ ] Page renders path cards from content collection
  - [ ] `nuxt prepare` passes

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle` — APPROVE (Must Have 7/7, Must NOT Have 8/8)
  Verify all Must Have items present, all Must NOT absent. Check evidence files.

- [x] F2. **Manual QA** — `unspecified-high` — APPROVE (Scenarios 10/10 pass)
  Full student flow: login → dashboard → course → lesson → exercise → progress saved → back to dashboard.

---

## Commit Strategy

- **After Wave 1**: `feat: add drizzle config and auth session utilities`
- **After Wave 2**: `feat: wire auth into API routes and add exercise components`
- **After Wave 3**: `feat: add student dashboard, course catalog, and learning paths`

---

## Success Criteria

### Verification Commands
```bash
pnpm --filter web exec nuxt prepare  # Types generate without errors
pnpm --filter web exec drizzle-kit generate  # Migrations generate
ls apps/web/server/db/migrations/*.sql  # Migration files exist
grep -r "userId.*temp\|userId.*demo" apps/web/server/  # Zero matches
ls apps/web/app/pages/dashboard.vue  # Dashboard page exists
ls apps/web/app/pages/courses/index.vue  # Catalog page exists
ls packages/exercise-engine/app/components/checkpoint/QcmExercise.vue  # QCM exists
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] Zero `userId: 'temp'` or `userId: 'demo-user'` in server code
- [ ] `drizzle.config.ts` exists and migrations generate
- [ ] Dashboard renders with real user data
- [ ] Course catalog lists available courses
- [ ] QCM exercise renders and tracks progress
