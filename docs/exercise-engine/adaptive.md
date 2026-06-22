# Adaptive Exercise Engine

**Related**: [Architecture Overview](../architecture.md), [User System](./user-system/database.md)

## Overview

The adaptive engine tracks user mastery per concept, detects weaknesses, and routes students to exercises that target their gaps — not just linear progression.

**Inspiration**: boot.dev (infinite practice + mastery tracking), Bayesian Knowledge Tracing (pyBKT), spaced repetition (SuperMemo/Anki).

## How It Works

```
User completes exercise
  → D1 records: { userId, conceptTag, passed, time, hints }
  → Mastery updated: correct / total × recency_weight
  → Next review scheduled: passed → 1-14 days, failed → 4 hours
  → Weak concepts surfaced: mastery < 60% → priority queue
  → Next exercise selected: weakest concept first, appropriate difficulty
```

## D1 Schema

```typescript
// server/db/schema/adaptive.ts
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { users } from './users'

// Concept taxonomy — tags linking exercises to skills
export const concepts = sqliteTable('concepts', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),      // 'flex-direction', 'closures'
  parentTopic: text('parent_topic'),           // 'css-flexbox', 'js-advanced'
  difficulty: real('difficulty').default(0.5), // 0.0 (easy) → 1.0 (hard)
  dependencies: text('dependencies'),          // JSON array of prerequisite concepts
})

// Exercise → concept mapping (one exercise can test multiple concepts)
export const exerciseConcepts = sqliteTable('exercise_concepts', {
  exerciseId: text('exercise_id').notNull(),   // 'css-fundamentals/02-flexbox#flex-direction'
  conceptTag: text('concept_tag').notNull(),
  weight: real('weight').default(1.0),         // How central this concept is to the exercise
})

// Per-user mastery per concept
export const userMastery = sqliteTable('user_mastery', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  conceptTag: text('concept_tag').notNull(),
  attempts: integer('attempts').default(0),
  correct: integer('correct').default(0),
  streak: integer('streak').default(0),        // Consecutive correct
  mastery: real('mastery').default(0),         // 0.0 → 1.0
  lastAttemptAt: integer('last_attempt_at'),
  nextReviewAt: integer('next_review_at'),     // Spaced repetition timestamp
  avgTimeSeconds: integer('avg_time_seconds'), // Time per attempt (signal of struggle)
  hintsUsed: integer('hints_used').default(0),
})

// Composite unique: one mastery row per user per concept
// uniqueIndex on (userId, conceptTag)
```

## Mastery Calculation

```typescript
// server/utils/adaptive-engine.ts

/** Phase 1: Weighted accuracy with recency bias */
export function calculateMastery(
  attempts: number,
  correct: number,
  lastAttemptAt: number,
): number {
  if (attempts === 0) return 0

  const rawAccuracy = correct / attempts

  // Recency: decay if last attempt was > 7 days ago
  const daysSinceLast = (Date.now() - lastAttemptAt) / (1000 * 60 * 60 * 24)
  const recencyWeight = Math.max(0.5, 1 - (daysSinceLast / 14))

  // Streak bonus: consecutive correct answers increase confidence
  // (computed separately from the streak field)

  return Math.round(rawAccuracy * recencyWeight * 100) / 100
}

/** Select the next exercise for a user within a course */
export async function getNextExercise(userId: number, courseSlug: string) {
  // 1. Find concepts where mastery < 0.7 AND review is due
  const weakConcepts = await db.select()
    .from(userMastery)
    .where(and(
      eq(userMastery.userId, userId),
      lt(userMastery.mastery, 0.7),
      lte(userMastery.nextReviewAt, Date.now()),
    ))
    .orderBy(userMastery.mastery)  // Weakest first
    .limit(5)

  if (weakConcepts.length === 0) {
    // All mastered or not due for review → advance
    return getNextTopicExercise(userId, courseSlug)
  }

  // 2. Pick exercise targeting the weakest concept
  const weakest = weakConcepts[0]

  // 3. Find an exercise that tests this concept and hasn't been completed
  const exercise = await db.select()
    .from(exerciseConcepts)
    .innerJoin(/* exercises */)
    .where(and(
      eq(exerciseConcepts.conceptTag, weakest.conceptTag),
      // Exclude already-completed exercises
    ))
    // Progressive difficulty: start easy, increase as mastery grows
    .orderBy(/* difficulty matching current mastery */)
    .limit(1)
    .first()

  return exercise
}

/** Spaced repetition scheduling — when to review this concept next */
export function scheduleNextReview(
  consecutivelyCorrect: number,
  passed: boolean,
): number {
  const now = Date.now()

  if (!passed) {
    // Failed → review soon
    return now + (4 * 60 * 60 * 1000) // 4 hours
  }

  // SM-2 inspired intervals (in days)
  const intervals = [1, 3, 7, 14, 30, 60]
  const index = Math.min(consecutivelyCorrect, intervals.length - 1)
  const days = intervals[index]

  return now + (days * 24 * 60 * 60 * 1000)
}

/** Update mastery after an exercise attempt */
export async function updateMastery(
  userId: number,
  exerciseId: string,
  passed: boolean,
  timeSeconds: number,
  hintsUsed: number,
) {
  // Get concepts tested by this exercise
  const testedConcepts = await db.select()
    .from(exerciseConcepts)
    .where(eq(exerciseConcepts.exerciseId, exerciseId))

  for (const mapping of testedConcepts) {
    const current = await db.query.userMastery.findFirst({
      where: and(
        eq(userMastery.userId, userId),
        eq(userMastery.conceptTag, mapping.conceptTag),
      ),
    })

    const attempts = (current?.attempts ?? 0) + 1
    const correct = (current?.correct ?? 0) + (passed ? 1 : 0)
    const streak = passed ? (current?.streak ?? 0) + 1 : 0
    const mastery = calculateMastery(attempts, correct, Date.now())
    const nextReview = scheduleNextReview(streak, passed)

    await db.insert(userMastery).values({
      userId,
      conceptTag: mapping.conceptTag,
      attempts,
      correct,
      streak,
      mastery,
      lastAttemptAt: Date.now(),
      nextReviewAt: nextReview,
      avgTimeSeconds: current
        ? Math.round((current.avgTimeSeconds * current.attempts + timeSeconds) / attempts)
        : timeSeconds,
      hintsUsed: (current?.hintsUsed ?? 0) + hintsUsed,
    }).onConflictDoUpdate({
      target: [userMastery.userId, userMastery.conceptTag],
      set: {
        attempts, correct, streak, mastery,
        lastAttemptAt: Date.now(),
        nextReviewAt: nextReview,
        avgTimeSeconds: /* recalc */,
        hintsUsed: /* recalc */,
      },
    })
  }
}
```

## Weakness Detection Signals

Weakness is not just low accuracy. The engine weighs multiple signals:

| Signal | Weight | Interpretation |
|---|---|---|
| Low mastery (< 0.6) | 0.40 | Consistently getting wrong |
| High variance (correct/wrong/correct) | 0.25 | Inconsistent — might be guessing |
| High avg time per attempt | 0.20 | Struggling to solve, even if correct |
| High hint usage | 0.10 | Needs external help |
| Repeated same error type | 0.05 | Specific misconception |

## API Endpoints

```typescript
// GET /api/adaptive/next-exercise?course=css-fundamentals
// Returns the next exercise tailored to user's weaknesses

// GET /api/adaptive/skill-map?course=css-fundamentals
// Returns mastery scores for all concepts in a course
// { concepts: [{ name: 'flex-direction', mastery: 0.8 }, ...] }

// POST /api/adaptive/submit
// Body: { exerciseId, passed, timeSeconds, hintsUsed, answers }
// Updates mastery for all concepts tested by this exercise
// Returns: { updatedConcepts: [...], nextExercise: {...} }
```

## UI — Skill Map

The course page shows a visual skill map:

```
┌──────────────────────────────────────────┐
│  CSS Fundamentals — Your Progress        │
│                                          │
│  Box Model      ████████░░  80% ████████│
│  Selectors      ██████████ 100% ███████░│
│  Specificity    ██████░░░░  60% ██████░░│
│  Flexbox        ████░░░░░░  40% ← weak  │
│  Grid           ██░░░░░░░░  20% ← focus │
│  Responsive     ░░░░░░░░░░   0% not yet │
│                                          │
│  ↓ Next: "Grid template areas"          │
│  "Grid is your weakest area. Let's       │
│   practice with a real layout."          │
└──────────────────────────────────────────┘
```

## Phase 2: Bayesian Knowledge Tracing

For more accurate mastery estimation, integrate pyBKT or a JS port:

```
BKT model per concept:
  P(knowing) = f(learns, forgets, guesses, slips, prior)

learns  → probability of acquiring the skill
forgets → probability of forgetting
guesses → probability of guessing right without knowing
slips   → probability of making a mistake despite knowing

Trained on user data across all students → predicts individual mastery
```

This would run as a separate Cloudflare Worker or scheduled job, training models offline and serving predictions via API.

## Edge Case Handling

### Input Validation

Every exercise with `type: 'qcm'` or `type: 'graphical'` **must** have at least one `conceptTag`. This is enforced at build time via the Zod schema in `content.config.ts`. Exercises without `conceptTags` are rejected by the build and will not be included in the published course.

This prevents exercises from entering the system without adaptive tracking — a gap that would make learning weaknesses invisible to the engine and the student.

### Mastery Calculation Guards

Mastery values are always clamped to the range `[0.0, 1.0]`:

```typescript
const clampedMastery = Math.max(0, Math.min(1, value))
```

Guard rules:

- **NaN prevention**: if `attempts === 0`, mastery is defined as `0` (not `NaN`).
- **Negative values**: impossible in practice because `correct` and `total` cannot be negative, and the clamp guarantees a floor of `0.0`.
- **Overflow**: any calculation exceeding `1.0` is capped at `1.0`.

Apply the clamp after every mastery update, including updates inside the exercise submit handler.

### Global vs Per-Course Mastery

Mastery is tracked **globally per concept**, not per course. If a student masters `flex-direction` in *CSS Fundamentals*, that mastery score applies when they encounter the same concept in a *Nuxt Layouts* course.

**Rationale**: concept mastery should transfer across courses. Re-learning the same idea in a new context is a retrieval opportunity, not a reset. Global tracking also keeps the data model simple and avoids duplicating concept rows for every course that references them.

Trade-off: difficulty calibration must be based on the concept itself, not the course context. Future iterations may add a per-course difficulty modifier without changing the underlying mastery score.

### Adaptive Race Condition Fix

The adaptive mastery update must be **synchronous** in the exercise submit handler. Do not fire-and-forget the update.

Required sequence inside the submit handler:

1. Save the attempt to D1.
2. Update mastery synchronously for all concepts tested by the exercise.
3. Check lesson completion (which may depend on updated mastery values).
4. Return the response.

All writes should run inside a single D1 transaction so that a failure at any step leaves mastery, attempt, and completion state consistent. Avoid parallelizing these steps, or the lesson may be marked complete before mastery is updated.

### Stale Review Handling

If `nextReviewAt` is in the past — for example, because a student was inactive for several days — the concept immediately becomes eligible for review. No special handling is required.

The standard query naturally catches stale reviews:

```typescript
.where(lte(userMastery.nextReviewAt, Date.now()))
```

This means inactive students will see overdue concepts surfaced first, keeping the queue accurate without manual intervention.

### Clock Skew

All timestamps use server time, specifically D1's `CURRENT_TIMESTAMP` and `Date.now()` inside server-side handlers. `nextReviewAt` is calculated server-side in the adaptive engine, never from the client's clock.

This prevents clock skew issues where a device with an incorrect date would schedule reviews too far in the future or in the past. Client-side timestamps are not trusted for mastery or scheduling logic.

### Concept Dependency Tracking

The `concepts` table includes a `dependencies` field: a JSON array of prerequisite concept names. When a student struggles with concept `X`, the engine checks whether they are missing any of `X`'s recorded prerequisites and suggests reviewing those concepts first.

Example dependency graph stored in `concepts.dependencies`:

```json
{
  "name": "flex-wrap",
  "dependencies": ["flex-direction", "flex-container"]
}
```

When mastery for `flex-wrap` stays low, the UI can surface a prompt such as: "Struggling with flex-wrap? Review flex-direction and flex-container first." This keeps remediation targeted at root causes rather than symptoms.
