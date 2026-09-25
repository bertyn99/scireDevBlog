# Core Platform Foundation — Learnings

## Task 1: Drizzle Config & D1 Migrations

### Date: 2026-06-25

### What worked
- `npx drizzle-kit@0.30.6 generate` works directly from `apps/web/` using the drizzle.config.ts config
- 4 schema files (users, progress, adaptive, subscriptions) successfully produce all 9 tables
- `nuxt prepare` passes with no type errors from migration artifacts
- D1 HTTP driver (`d1-http`) for drizzle-kit doesn't need actual DB credentials for `generate` — it only reads the schema files to produce SQL

### What didn't work
- `pnpm --filter web db:generate` triggers `pnpm install` first, which:
  - Requires TTY to confirm module directory purge (fix: `CI=true` env var)
  - Times out on slow network / missing native binaries for `esbuild`, `@tailwindcss/oxide`, etc.
  - Build scripts blocked by pnpm v11 default `onlyBuiltDependencies` policy
  - Fix: Use `npx` directly in the target directory instead of `pnpm --filter`

### Gotchas
- drizzle-kit@0.30.6 with D1 HTTP driver requires `dbCredentials` in config even for `generate` (it validates the config but doesn't actually connect)
- Composite unique constraints (like `lesson_progress` on `(user_id, lesson_path)`) declared with `(table) => ({ key: { unique: { columns: [...] } } })` syntax may not produce the expected unique index in generated SQL — need to verify manually
- pnpm v11 ignores build scripts by default for all packages not in `onlyBuiltDependencies` — this breaks esbuild, tailwindcss, and other native binary packages. Need to add `onlyBuiltDependencies` list to root `package.json`

### Resources
- drizzle-orm-d1 skill: Comprehensive reference for Drizzle + Cloudflare D1 patterns
- Drizzle Kit docs: https://orm.drizzle.team/docs/kit-overview

## Task 6: Graphical Exercise Component

### Date: 2026-06-25

### What worked
- Reusing QcmExercise.vue (Task 5) patterns verbatim — optionClasses/indicatorClasses/labelClasses/letterBadgeColor helpers copy across cleanly
- Image rendered with native `<img>` + `@error` handler → `imageError` ref toggles placeholder (no NuxtImg dependency needed)
- `aspect-video` + `object-contain` keeps image responsive without distortion
- `nuxt prepare` confirms auto-import as `CheckpointGraphicalExercise` (directory prefix `checkpoint/` + filename `GraphicalExercise.vue`)
- useCheckpoint composable's `solved` ref wires into submit/reset without modification

### What didn't work
- Initial `Read` of QcmExercise.vue failed because the file appeared between the plan read and the component read — re-checking with `ls` revealed it existed (Task 5 landed during this task)
- `app/app.config.ts` path is actually `apps/web/app/app.config.ts` (monorepo: app sources under apps/web/, not project root)

### Gotchas
- GraphicalExercise adds `image: string` as required prop — must come before `question` in the interface to keep withDefaults happy
- Image `alt` should be descriptive: computed `Illustration for: ${question}` rather than empty string (a11y)
- Do NOT auto-submit on image error — the user still needs to attempt the question; fallback is visual only
- `@error` on `<img>` is the correct SSR-safe way to detect load failures (no onLoad needed)

### Pattern for extending checkpoint exercises
- All checkpoint exercises share: UCard wrapper, #header slot for prompt, form body with fieldset, optionClasses helper family, feedback banner, explanation panel, Submit/Try Again actions
- New exercise types add their prompt medium (image, code, audio) to the #header slot, keep the options/feedback/explanation body identical


## Task 5: QCM Exercise Component

### Date: 2026-06-25

### What worked
- `nuxt prepare` from `apps/web/` successfully auto-imports components from the exercise-engine layer — subdirectory `checkpoint/` + `QcmExercise.vue` → `CheckpointQcmExercise` (confirmed in `.nuxt/types/components.d.ts`)
- Nuxt UI v4 components (`UCard`, `UButton`, `UBadge`, `UIcon`) work in the layer without explicit imports — auto-imported by the `@nuxt/ui` module in the consumer app
- `useCheckpoint()` composable auto-imports in layer components — can call directly without import statement
- `withDefaults(defineProps<{...}>(), {...})` pattern works for optional props with default values (conceptTags → `[]`)
- LSP diagnostics on `.vue` files correctly resolve auto-imports (UCard, UIcon, ref, computed, etc.) after `nuxt prepare` generates types

### What didn't work
- `pnpm lint` from root triggers full `pnpm install` which fails on native build script approval (`ERR_PNPM_IGNORED_BUILDS`) — pre-existing issue from Task 1
- ESLint direct invocation (`npx eslint <file>`) fails because `eslint.config.mjs` imports `.nuxt/eslint.config.mjs` which itself has unresolved ESM imports without dev server running — requires `pnpm dev` to be started first per AGENTS.md gotcha

### Gotchas
- Component auto-import naming: directory name becomes PREFIX. `checkpoint/QcmExercise.vue` → `<CheckpointQcmExercise>`. This is Nuxt's path-based naming convention
- `UIcon` names must match icon collections in `nuxt.config.ts` `icon.serverBundle.collections`. Current: `uil`, `mdi`, `bxl`, `heroicons`. Used `i-heroicons-*` names in this component
- Tailwind v4 opacity syntax: `bg-primary/5`, `bg-primary/10` works with Nuxt UI v4 semantic colors (primary=orange)
- For accessible radio-like buttons: use `<button type="button" :aria-pressed>` inside `<fieldset>` with `<legend class="sr-only">` pattern. Do NOT use actual radio inputs if you want card-style clickable areas
- `defineEmits<{ completed: [payload: TypedInterface] }>()` syntax requires the tuple type `[Interface]` not just `Interface` for typed payloads

### Resources
- Nuxt UI v4 components reference: https://ui.nuxt.com/components (UCard, UButton, UBadge, UIcon)
- Vue 3 defineEmits typing: https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits

## Task 4: Dashboard API Endpoints

### Date: 2026-06-25

### What worked
- `nuxt prepare` from `apps/web/` validates all 4 new API route files — types generated cleanly
- LSP diagnostics return 0 errors on all 4 files (auto-imports for `defineEventHandler`, `requireUserSession`, `useLogger`, `hubDb`, `createError` all resolve correctly)
- Pattern from `next-exercise.get.ts` and `submit.post.ts` replicates cleanly: `requireUserSession(event)` + `useLogger(event)` + `hubDb()` + try/catch
- Drizzle timestamp mode returns `Date` objects — use `.getTime()` to convert to `number` for JSON response shapes
- `import * as progressSchema from '~~/server/db/schema/progress'` alias works for accessing all exported tables
- `db.select({ field: table.column }).from(table).where(...)` projection syntax works perfectly for shaping query output
- Destructuring `const [lastLesson] = await db.select()...limit(1)` is a clean pattern for single-row queries

### Gotchas
- `lessonProgress` schema has NO `lastAccessedAt` field (only `startedAt` and `completedAt`) — used `startedAt` desc for "last accessed" ordering
- `lessonTitle` is not stored in any DB table (comes from Nuxt Content) — returned `null` in API response, frontend must enrich from content
- Drizzle `lte(column, new Date())` works with timestamp mode columns — Drizzle handles Date→Unix conversion automatically
- For activity feed merging two tables (attempts + lesson completions), TypeScript needs explicit `Array<{...}>` typing on the accumulator
- `vue-tsc --noEmit` has pre-existing errors (missing `@unlighthouse/nuxt` type defs) — NOT introduced by new code. Use `nuxt prepare` + LSP diagnostics for verification instead

### Patterns
- GET endpoint skeleton: `defineEventHandler(async (event) => { const log = useLogger(event); try { const { user } = await requireUserSession(event); const db = hubDb(); log.set({ userId: user.id }); ... } catch (error) { log.error(error, { step: '...' }); throw createError(...) } })`
- For review queue / spaced repetition: filter with `isNotNull(nextReviewAt)` AND `lte(nextReviewAt, new Date())` to get only due concepts
- For activity feeds: query multiple tables separately, map to common shape, merge into single array, sort by timestamp desc
