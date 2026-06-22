# Nuxt 5 Compatibility Upgrade — Phase 2 Plan

## TL;DR

> **Quick Summary**: Enable `future.compatibilityVersion: 5` on Nuxt 4.4.7, fix all resulting deprecation issues, and prepare server code for the eventual Nitro v3 migration.
>
> **Deliverables**:
> - `future.compatibilityVersion: 5` enabled in `apps/web/nuxt.config.ts`
> - All `queryContent()` (Content v2 API) migrated to `queryCollection()` (Content v3 API)
> - `documentDriven: true` removed (deprecated)
> - Dead code removed (`server/api/load.ts`, unused `createDb()`)
> - `process.env` in server code → `useRuntimeConfig()`
> - Nitro v3 migration annotations added to server routes (JSDoc comments)
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Step 1 (enable flag) → Step 2 (fix deprecations) → Step 3 (cleanup) → Step 4 (verify)

---

## Context

### Original Request
Upgrade the web app and exercise layer to Nuxt 4 with Nuxt 5 compatibility. Use Option 1: Progressive — stay on Nuxt 4.4.7, enable compatibility flags, fix all deprecation warnings.

### Research Summary
- **Nuxt 5 is NOT yet released** — Draft PR #34497, timetable TBA
- `future.compatibilityVersion: 5` is available on Nuxt 4.4.7 and opts into testable Nuxt 5 behaviors
- **Nitro v3 cannot be fully tested yet** — requires Nuxt 5 actual release
- `app.config.ts` is NOT removed in Nuxt 5 (only Nitro's internal app config is)
- `@nuxt/content` v4 does NOT exist — v3 is current and compatible
- `@nuxt/ui` v5 does NOT exist — v4 is current and compatible
- Vue stays on 3.5.x — no Vue 4 migration

### What `compatibilityVersion: 5` Changes
| Behavior | Old (v4) | New (v5 compat) |
|---|---|---|
| `clearNuxtState` | Sets to `undefined` | Resets to initial value |
| `callHook` | Always returns `Promise` | May return `void` (faster) |
| Client-only placeholders | Empty `<div>` | HTML comment `<!--placeholder-->` |
| Page component names | May differ from route names | Match route names |

### What This Plan Does NOT Do
- Does NOT change `readBody(event)` → `event.req.json()` (requires Nitro v3, would break on Nitro v2)
- Does NOT change `defineEventHandler` → `defineHandler` (auto-imports still work, no explicit imports found)
- Does NOT change `event.context.cloudflare.env` (not used — NuxtHub `hubDb()` handles this)
- Does NOT remove `app.config.ts` (still works in Nuxt 5 — the removal was a Nitro-level concern)
- Does NOT upgrade `@nuxt/content` or `@nuxt/ui` (no new versions exist)

---

## Work Objectives

### Core Objective
Make the codebase Nuxt 5-ready while staying on Nuxt 4.4.7. Zero runtime behavior changes.

### Definition of Done
- [ ] `future.compatibilityVersion: 5` set in `apps/web/nuxt.config.ts`
- [ ] `pnpm dev` starts without deprecation warnings
- [ ] `npx nuxt typecheck` passes (or documents pre-existing errors)
- [ ] All `queryContent()` calls migrated to `queryCollection()`
- [ ] No dead code in `server/api/`

### Must Have
- `future.compatibilityVersion: 5` enabled
- `queryContent()` in Hero.vue → `queryCollection('blog')`
- `documentDriven: true` removed from content config
- Dead code removed: `server/api/load.ts`, unused `createDb()` factory

### Must NOT Have (Guardrails)
- NO Nitro v3 API changes (`readBody`, `defineHandler`, `event.req.json()`) — these require Nuxt 5 actual release
- NO package version upgrades (stay on Nuxt 4.4.7, @nuxt/content 3.14, @nuxt/ui 4.8)
- NO changes to `hubDb()` calls — NuxtHub handles compatibility
- NO changes to `app.config.ts` — it still works in Nuxt 5
- NO changes to `app.vue`, pages, or components (except Hero.vue queryContent fix)
- NO changes to the exercise-engine layer structure

---

## TODOs

- [ ] 1. Enable Nuxt 5 compatibility mode

  **What to do**:
  - Add `future: { compatibilityVersion: 5 }` to `apps/web/nuxt.config.ts`
  - Run `pnpm dev` and capture all deprecation warnings
  - Run `npx nuxt typecheck` and capture type errors

  **Must NOT do**:
  - Do not change any other config in nuxt.config.ts
  - Do not upgrade any packages

  **Acceptance Criteria**:
  - [ ] `apps/web/nuxt.config.ts` has `future: { compatibilityVersion: 5 }`
  - [ ] Deprecation warnings captured in `.omo/evidence/compat-warnings.txt`
  - [ ] Type errors captured in `.omo/evidence/typecheck-baseline.txt`

- [ ] 2. Fix deprecated Content v2 API patterns

  **What to do**:
  - Migrate `queryContent()` in `apps/web/app/components/Hero.vue` (lines 102-103) to `queryCollection('blog')`
  - Remove `documentDriven: true` from `apps/web/nuxt.config.ts` content config (line 79)
  - Verify all blog/course pages still render correctly

  **Files to change**:
  - `apps/web/app/components/Hero.vue` — replace `queryContent({ path: "/blog" })...find()` with `queryCollection("blog")...all()`
  - `apps/web/nuxt.config.ts` — remove `documentDriven: true` from `content` block

  **Must NOT do**:
  - Do not change any page component logic
  - Do not change content.config.ts schemas

  **Acceptance Criteria**:
  - [ ] `grep -r "queryContent" apps/web/app/` returns 0 results
  - [ ] `grep "documentDriven" apps/web/nuxt.config.ts` returns 0 results
  - [ ] Homepage renders with blog articles still visible

- [ ] 3. Clean up dead code and fix server patterns

  **What to do**:
  - Delete `apps/web/server/api/load.ts` (empty file, dead code)
  - Remove unused `createDb()` export from `apps/web/server/db/index.ts` OR mark it as the canonical DB factory (decision needed)
  - Fix `process.env.GITHUB_CLIENT_ID` / `process.env.GITHUB_CLIENT_SECRET` in `apps/web/server/auth.ts` → use `useRuntimeConfig()` or accept from caller
  - Add JSDoc `@nitro-v3-migration` annotations to files that will need Nitro v3 changes:
    - `server/api/adaptive/update.post.ts` — `readBody(event)` → `event.req.json()`
    - `server/api/progress/lesson/start.post.ts` — same
    - `server/api/progress/lesson/complete.post.ts` — same
    - `server/api/progress/exercise/submit.post.ts` — same

  **Must NOT do**:
  - Do NOT actually change `readBody` to `event.req.json()` (would break on Nitro v2)
  - Do not change `hubDb()` calls
  - Do not change `defineEventHandler` (auto-imports still work)

  **Acceptance Criteria**:
  - [ ] `apps/web/server/api/load.ts` deleted
  - [ ] `apps/web/server/auth.ts` uses `useRuntimeConfig()` instead of `process.env`
  - [ ] 4 server route files have `@nitro-v3-migration` JSDoc comments

- [ ] 4. Verify everything works

  **What to do**:
  - Run `pnpm dev` — verify starts cleanly, no new errors
  - Visit `/` — homepage renders with blog articles
  - Visit `/blog` — blog index renders
  - Visit `/courses/css-fundamentals` — course renders
  - Visit `/auth/login` — auth page renders
  - Run `npx nuxt typecheck` — verify no new type errors

  **Acceptance Criteria**:
  - [ ] `pnpm dev` starts without errors
  - [ ] All key routes return 200
  - [ ] No new TypeScript errors from compatibility mode
  - [ ] Exercise engine layer still loads correctly

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — verify all Must Have items present, all Must NOT absent
- [ ] F2. **Manual QA** — verify dev server starts, key routes render

---

## Commit Strategy

- **1**: `feat: enable Nuxt 5 compatibility mode and clean up deprecated patterns`
