# Architecture Audit — Edge Cases, Gaps & Risks

**Status**: 🔴 Critical findings that need fixing before production
**Date**: 2026-06-15
**Scope**: Exercise engine, data model, security, deployment

---

## 1. Exercise Engine Issues

### 🔴 Critical

| # | Issue | Impact | Fix |
|---|---|---|---|
| 1.1 | **No state recovery on page refresh** — WebContainer/Sandbox state is in-memory. Student refreshes = loses all work. | Lost progress, frustrated students | Save code to localStorage (debounced). On mount, check localStorage before loading starter. Sandbox tier: use snapshots. |
| 1.2 | **@completed event fires but API fails** — No retry mechanism. Student passes exercise but progress isn't saved. | Silent data loss | Queue events in localStorage. Retry with exponential backoff. Show "Saving..." indicator. |
| 1.3 | **Client-side validation can be bypassed** — Anyone can open DevTools and call the progress API directly. | Cheating, inflated scores | Server-side re-validation required. For code challenges: re-run assertions server-side. For QCM: verify answer matches exercise definition. |

### 🟡 Important

| # | Issue | Impact | Fix |
|---|---|---|---|
| 1.4 | **Base template changes break existing exercises** — If `base-nuxt/package.json` updates Nuxt version, existing exercises may break. | Exercises stop working after template update | Version base templates (`base-nuxt-v1`, `base-nuxt-v2`). Exercises pin to a version. |
| 1.5 | **No way to DELETE a file from base template** — Overrides only add or replace. Can't remove a file the base provides. | Exercises can't fully customize their file tree | Support a `deleteFiles: ['app.vue']` field in `.template/index.ts`. |
| 1.6 | **Multiple exercises on same page = multiple sandboxes** — Each code challenge creates its own iframe/WebContainer. Resource exhaustion. | Browser crashes, memory leaks | Lazy-load exercises. Only initialize sandbox when scrolled into view (Intersection Observer). Destroy when scrolled out. |
| 1.7 | **Malformed assertions silently fail** — Bad CSS selector returns "not found" without erroring. Student thinks their code is wrong. | False negatives, bad learning experience | Validate assertion format at build time (Zod schema). Log malformed assertions with evlog. |
| 1.8 | **Timing issues in test runner** — CSS animations, font loading, async rendering may not be complete when assertions run. | Flaky tests, inconsistent results | Wait for `requestAnimationFrame` + small delay before running assertions. Add `waitFor(selector, timeout)` helper. |
| 1.9 | **Two tabs submitting same exercise** — Race condition in attempt numbering. | Duplicate attempts, incorrect adaptive tracking | Use `Mutex` or D1 transaction for attempt numbering. Check if attempt already exists before inserting. |

### 🟢 Nice to Have

| # | Issue | Fix |
|---|---|---|
| 1.10 | No "hint used" tracking for adaptive engine | Add `hintsUsed` to exercise submission payload |
| 1.11 | No "show solution" tracking (does student give up?) | Track when solution is toggled, feed to adaptive engine as negative signal |
| 1.12 | Cross-browser CSS differences in assertions | Normalize computed styles (e.g., `rgb(0,0,0)` vs `#000`). Use tolerance for numeric values. |

---

## 2. Data Model Issues

### 🔴 Critical

| # | Issue | Impact | Fix |
|---|---|---|---|
| 2.1 | **Lesson renamed → D1 progress orphaned** — `lessonPath` in D1 no longer matches MD file path. Student loses all progress. | Mass progress loss on content refactor | Add a `redirects` table: `{ oldPath, newPath }`. Query redirects before progress lookup. OR: use stable IDs (UUID) in frontmatter instead of filesystem paths. |
| 2.2 | **Exercise deleted → orphaned attempts** — `exercise_attempts` reference exercise IDs that no longer exist. | Data bloat, incorrect analytics | Soft-delete exercises (add `deleted: true` flag). Cleanup job for orphaned attempts. |
| 2.3 | **No content migration strategy** — When courses are restructured, there's no way to migrate user progress. | Platform unusable after major content changes | Build a migration script that maps old paths to new paths. Run as a D1 migration. |

### 🟡 Important

| # | Issue | Impact | Fix |
|---|---|---|---|
| 2.4 | **Double-click submit → duplicate attempts** — Two API calls fire before first completes. | Inflated attempt count, incorrect adaptive scoring | Idempotency key per submission (exerciseId + attemptNumber). D1 unique constraint. Frontend: disable button after click. |
| 2.5 | **Adaptive engine race with lesson completion** — Mastery update and lesson completion check run concurrently. | Lesson marked complete before mastery updated | Make adaptive update synchronous in the exercise submit handler. Don't fire-and-forget. |
| 2.6 | **Empty conceptTags → mastery not tracked** — Exercise has no tags, adaptive engine silently skips it. | Learning gaps invisible to student | Validate at build time: every Checkpoint exercise MUST have at least 1 conceptTag. Zod schema enforcement. |
| 2.7 | **Cross-course concepts → mastery is global** — "flex-direction" mastery in CSS Fundamentals affects Nuxt course. | Incorrect difficulty calibration across courses | Consider per-course mastery tracking: `userMastery.courseSlug` column. OR: accept global mastery (concept mastery SHOULD transfer). |
| 2.8 | **timeSpentSeconds never populated** — Schema has the field but no mechanism populates it. | Can't estimate lesson duration accurately | Client-side timer: track time between lesson open and lesson complete. Send with completion API call. |
| 2.9 | **No bookmark/favorite system** — Students can't save lessons for later. | Poor UX for returning students | Add `bookmarks` table: `{ userId, lessonPath, createdAt }`. Simple CRUD API. |
| 2.10 | **No partial exercise state** — Code challenge in progress is lost on refresh (beyond localStorage). | Can't resume complex exercises across sessions | Store latest code submission per user per exercise in D1. Load on exercise open. |

### 🟡 Subscription Edge Cases

| # | Issue | Fix |
|---|---|---|
| 2.11 | **Subscription expires mid-course** — Student immediately locked out. Bad UX. | Add 7-day grace period. Check `currentPeriodEnd + 7 days` instead of just `status`. |
| 2.12 | **Stripe webhook race** — Webhook arrives before OAuth redirect. User sees "no subscription" briefly. | Webhook creates subscription record. Frontend polls subscription status for 30s after redirect. |
| 2.13 | **Free tier has no limits** — Unlimited exercise attempts, no gating. | Add daily attempt limit for free tier (e.g., 10 exercises/day). Track in KV with TTL. |

---

## 3. Security Issues

### 🔴 Critical

| # | Issue | Impact | Fix |
|---|---|---|---|
| 3.1 | **No API-level authorization** — Progress API uses `userId: 'temp'`. Any request can submit progress for any user. | Complete security bypass | Every API route MUST verify session: `const session = await getServerSession(event); if (!session) throw 401`. Filter all D1 queries by `session.user.id`. |
| 3.2 | **No row-level security on D1** — API doesn't filter queries by authenticated user. Student A can query Student B's progress. | Privacy violation, data leak | Every D1 query that touches user data MUST include `WHERE userId = ?` with the session user ID. Never trust client-sent userId. |
| 3.3 | **Sandbox network isolation unverified** — User code in Cloudflare Sandbox could make network requests to internal APIs. | Data exfiltration, internal API abuse | Configure `enableInternet: false` on Sandbox containers. Use egress proxy for allowlisted domains only. |

### 🟡 Important

| # | Issue | Impact | Fix |
|---|---|---|---|
| 3.4 | **No rate limiting on exercise submission** — Bot can submit thousands of attempts. | D1 write quota exhaustion, cost spike | KV-based rate limiter: 30 submissions per user per 10 minutes. Return 429 if exceeded. |
| 3.5 | **No sandbox CPU time limit** — User code could run infinite loops or mine crypto. | Cost spike, resource exhaustion | Set `sleepAfter: '30s'` on Sandbox containers. Client-side: timeout test runner after 10s. |
| 3.6 | **Admin role check only in middleware** — Middleware runs client-side. API routes may not check roles. | Privilege escalation | Every admin API route MUST verify `session.user.role === 'admin'` server-side. Don't rely on middleware alone. |
| 3.7 | **No CSRF protection** — Auth forms and exercise submission vulnerable to cross-site request forgery. | Session hijacking | Use Better Auth's built-in CSRF protection. Add CSRF token to all POST forms. |
| 3.8 | **XSS via exercise submissions** — Student code could contain `<script>` tags that execute in preview iframe. | XSS in the context of the sandbox | iframe `sandbox="allow-scripts"` without `allow-same-origin` prevents access to parent. But verify CSP headers are set. |
| 3.9 | **Premium content not gated at API level** — Exercise data in MD files is public. API endpoints may not check subscription. | Free users access premium content | Add subscription check middleware on premium course API routes. Return 402 Payment Required. |

### 🟢 Hardening

| # | Issue | Fix |
|---|---|---|
| 3.10 | R2 exercise screenshots may be publicly accessible | Use signed URLs for premium content. Public for free content. |
| 3.11 | No input sanitization on open_question answers | Sanitize before storing in D1. Escape on display. |
| 3.12 | Nuxt Studio access not restricted | Configure Studio auth providers. Only allow admin emails. |
| 3.13 | No audit log for admin actions | Use evlog's audit feature (already documented). |

---

## 4. Deployment Risks

### 🟡 Important

| # | Issue | Impact | Fix |
|---|---|---|---|
| 4.1 | **Cold starts on Workers** — First request after idle takes 200-500ms. | Sluggish first page load | Pre-warm critical routes. Use ISR (already configured). Acceptable for MVP. |
| 4.2 | **D1 performance at scale** — 5GB limit, complex JOINs may be slow. | Slow API responses at scale | Monitor query times with evlog. Add indexes on (userId, lessonPath). Consider read replication. |
| 4.3 | **Studio edit breaks production build** — Author commits broken MD, CI deploys it. | Site goes down | GitHub Actions CI: run `nuxt build` before deploy. Block deploy if build fails. |
| 4.4 | **No staging environment** — Changes go straight to production. | Risk of breaking changes | Deploy to `staging.sciredev.com` first. Use Cloudflare Pages preview deployments. |
| 4.5 | **No rollback strategy** — Bad deploy can't be quickly reverted. | Extended downtime | Cloudflare Pages supports instant rollback. Document the rollback procedure. |

---

## Priority Fix Order

**Before any user testing:**
1. Fix #3.1, #3.2 — API authorization (every route MUST verify session)
2. Fix #1.1 — State recovery on page refresh (localStorage backup)
3. Fix #1.2 — Event retry mechanism for failed API calls
4. Fix #2.1 — Stable lesson IDs or redirects table

**Before paid subscriptions:**
5. Fix #3.4 — Rate limiting on submissions
6. Fix #3.5 — Sandbox CPU limits
7. Fix #2.11 — Subscription grace period
8. Fix #2.13 — Free tier limits
9. Fix #3.9 — Premium content gating at API level

**Before scale (1000+ students):**
10. Fix #1.6 — Lazy-load exercises (Intersection Observer)
11. Fix #2.4 — Idempotency keys on submissions
12. Fix #4.3 — CI build check before deploy
13. Fix #4.5 — Rollback procedure documented
