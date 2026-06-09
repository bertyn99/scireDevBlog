# Observability — Structured Logging with evlog

## Why evlog

evlog emits **one wide event per request** instead of scattered log lines. Every API call gets structured context: duration, user, action, errors with `why` + `fix` fields. This is critical for debugging a learning platform where a single student action (submitting an exercise) triggers multiple services (D1 write, adaptive engine update, progress calculation).

## Configuration

```typescript
// nuxt.config.ts
modules: ['evlog/nuxt'],

evlog: {
  env: {
    service: 'sciredev',
  },
  // Log only API routes to reduce noise from page loads
  include: ['/api/**'],
}
```

## What to Log — By Domain

### Auth (`/api/auth/**`)

```typescript
// server/api/auth/login.post.ts
const log = useLogger(event)

log.set({ auth: { method: 'email', provider: 'github' } })
log.set({ user: { id: userId, role: 'student' } })

// Failed login
log.error(error, { step: 'oauth-callback' })
// → Why: GitHub token expired
// → Fix: Re-authenticate with GitHub
```

| Event | Fields | Why log it |
|---|---|---|
| Login success | `auth.method`, `user.id`, `user.role` | Track active users, auth method popularity |
| Login failure | `auth.method`, `error.message` | Detect brute force attempts, OAuth issues |
| Signup | `auth.method`, `user.id` | Growth metrics, conversion tracking |
| Session refresh | `user.id` | Session health, token expiry patterns |
| Logout | `user.id` | Session duration metrics |

### Progress (`/api/progress/**`)

```typescript
// server/api/progress/exercise/submit.post.ts
const log = useLogger(event)

log.set({ exercise: { id: exerciseId, type: 'qcm', passed, score, maxScore } })
log.set({ lesson: { path: lessonPath } })
log.set({ user: { id: userId } })
log.set({ attempt: { number: attemptNumber } })

// Adaptive engine update
log.set({ adaptive: { conceptsUpdated: conceptTags.length, masteryDelta: '+0.15' } })

// Lesson completion
log.set({ lesson: { status: 'completed', timeSpent: 842 } })
```

| Event | Fields | Why log it |
|---|---|---|
| Exercise submitted | `exercise.id`, `type`, `passed`, `score` | Core learning metric, exercise difficulty analysis |
| Attempt retry | `attempt.number`, `passed` | Track which exercises need multiple tries (hint: too hard) |
| Lesson completed | `lesson.path`, `timeSpent`, `score` | Time-to-complete estimates, course completion rates |
| Course completed | `course.slug`, `totalScore`, `duration` | Course effectiveness, certificate generation trigger |

### Adaptive Engine (`/api/adaptive/**`)

```typescript
// server/api/adaptive/update.post.ts
const log = useLogger(event)

log.set({ adaptive: { conceptTag, mastery, streak, nextReview } })

// Reset (consecutive failure)
log.error(error, { step: 'mastery-calculation' })
// → Wide event emitted with all context
```

| Event | Fields | Why log it |
|---|---|---|
| Mastery updated | `conceptTag`, `mastery`, `streak` | Track learning velocity per concept |
| Weakness detected | `conceptTag`, `mastery < 0.4` | Identify problematic course content |
| Review scheduled | `nextReview` | Verify spaced repetition intervals |
| Next exercise selected | `selectedConcept`, `reason: 'weakest'` | Validate adaptive routing logic |

### Exercise Validation (`/api/exercise/**`)

```typescript
// server/api/exercise/validate.post.ts
const log = useLogger(event)

log.set({ exercise: { id: exerciseId, type: 'code_challenge' } })
log.set({ validation: { testsPassed: 3, totalTests: 4, language: 'html-css' } })
log.set({ sandbox: { bootTime: 1242, type: 'iframe' } })

// Sandbox error
log.error(error, { step: 'sandbox-execution' })
// → Why: WebContainer boot failed — SharedArrayBuffer not available
// → Fix: Ensure COOP/COEP headers are set on the page
```

| Event | Fields | Why log it |
|---|---|---|
| Code challenge run | `validation.testsPassed`, `totalTests` | Exercise quality metrics, test coverage |
| Sandbox boot time | `sandbox.bootTime`, `type` | Performance monitoring (iframe vs WebContainer vs Sandbox SDK) |
| Test execution | `language`, `success` | Detect failing test suites |
| Hints used | `hintsUsed` | Measure exercise clarity |

### Admin (`/api/admin/**`)

```typescript
// server/api/admin/courses/update.post.ts
const log = useLogger(event)
log.audit?.({
  action: 'course.update',
  actor: { type: 'admin', id: adminId },
  target: { type: 'course', id: courseSlug },
  outcome: 'success',
  changes: auditDiff(before, after),
})
```

| Event | Fields | Why log it |
|---|---|---|
| Content changed | `action`, `target`, `changes` | Audit trail for course modifications |
| User role changed | `action: 'user.promote'`, `target` | Security tracking |
| Subscription updated | `action: 'subscription.change'`, `plan` | Business operations |

### Errors & System Health

```typescript
// Global error handler
export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  try {
    return await handleRequest(event)
  } catch (error) {
    log.error(error, { step: 'request-handler' })
    throw error
  }
})
```

| Event | Fields | Why log it |
|---|---|---|
| D1 query failure | `error.message`, `duration` | Database health monitoring |
| Auth provider error | `provider`, `error.code` | OAuth integration health |
| Rate limit hit | `user.id`, `endpoint` | Abuse detection |
| Sandbox creation failure | `error.type`, `region` | Cloudflare Containers health |

## Sampling Strategy

```typescript
// nuxt.config.ts
evlog: {
  include: ['/api/**'],
  $production: {
    sampling: {
      rates: {
        info: 10,    // 1 in 10 info events kept
        warn: 50,    // 1 in 50 warnings kept
        debug: 0,    // No debug events in prod
      },
    },
  },
  $development: {
    sampling: {
      rates: {
        info: 1,     // All events in dev
        warn: 1,
        debug: 1,
      },
    },
  },
}
```

**Why**: Exercise submissions are high-frequency (100s per minute with 1000 students). Full logging would overwhelm storage. Sampling keeps signal while controlling costs. Warnings and errors are always kept.

## Audit Trail

For admin actions that change state (content edits, user management, subscriptions):

```typescript
import { auditDiff } from 'evlog'

// Audit admin content changes
log.audit?.({
  action: 'course.publish',
  actor: { type: 'admin', id: adminId, email: admin.email },
  target: { type: 'course', slug: courseSlug },
  outcome: 'success',
  changes: auditDiff(beforeState, afterState),
})
```

Audit events are always force-kept by the sampling system (never sampled away).

## Correlating Events

Every API event auto-includes:
- `timestamp` — when it happened
- `method` + `path` — which endpoint
- `duration` — how long it took
- `requestId` — correlate related events

This means you can trace a student's journey: login → course opened → lesson started → exercise submitted → mastery updated — all connected by `requestId` if they're part of the same request, or by `user.id` across separate requests.
