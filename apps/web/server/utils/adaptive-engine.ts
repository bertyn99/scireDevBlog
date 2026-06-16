import { eq, and, lt, lte } from 'drizzle-orm'
import * as adaptiveSchema from '../db/schema/adaptive'

/**
 * Calculate mastery score: weighted accuracy with recency bias.
 * Range: 0.0 (no mastery) → 1.0 (fully mastered).
 */
export function calculateMastery(
  attempts: number,
  correct: number,
  lastAttemptAt: Date,
): number {
  if (attempts === 0) return 0

  const rawAccuracy = correct / attempts
  const daysSinceLast = (Date.now() - lastAttemptAt.getTime()) / (1000 * 60 * 60 * 24)
  const recencyWeight = Math.max(0.5, 1 - (daysSinceLast / 14))

  return Math.round(rawAccuracy * recencyWeight * 100) / 100
}

/**
 * Spaced repetition: schedule next review based on consecutive correct answers.
 * Inspired by SM-2 algorithm, simplified.
 */
export function scheduleNextReview(
  streak: number,
  passed: boolean,
): Date {
  if (!passed) {
    // Failed → review in 4 hours
    return new Date(Date.now() + 4 * 60 * 60 * 1000)
  }

  const intervals = [1, 3, 7, 14, 30, 60] // days
  const index = Math.min(streak, intervals.length - 1)
  const days = intervals[index]
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

/**
 * Update mastery for all concepts tested by an exercise attempt.
 */
export async function updateMasteryForAttempt(
  db: any,
  userId: string,
  conceptTags: string[],
  passed: boolean,
  timeSeconds: number,
  hintsUsed: number,
) {
  for (const conceptTag of conceptTags) {
    const [current] = await db
      .select()
      .from(adaptiveSchema.userMastery)
      .where(
        and(
          eq(adaptiveSchema.userMastery.userId, userId),
          eq(adaptiveSchema.userMastery.conceptTag, conceptTag),
        ),
      )
      .limit(1)

    const attempts = (current?.attempts ?? 0) + 1
    const correct = (current?.correct ?? 0) + (passed ? 1 : 0)
    const streak = passed ? (current?.streak ?? 0) + 1 : 0
    const mastery = calculateMastery(attempts, correct, new Date())
    const nextReview = scheduleNextReview(streak, passed)

    const avgTime = current
      ? Math.round((current.avgTimeSeconds * current.attempts + timeSeconds) / attempts)
      : timeSeconds

    const values = {
      userId,
      conceptTag,
      attempts,
      correct,
      streak,
      mastery,
      lastAttemptAt: new Date(),
      nextReviewAt: nextReview,
      avgTimeSeconds: avgTime,
      hintsUsed: (current?.hintsUsed ?? 0) + hintsUsed,
    }

    if (current) {
      await db
        .update(adaptiveSchema.userMastery)
        .set(values)
        .where(eq(adaptiveSchema.userMastery.id, current.id))
    } else {
      await db.insert(adaptiveSchema.userMastery).values(values)
    }
  }
}

/**
 * Find the next exercise for a student based on weakest concepts.
 * Returns null if all concepts are mastered.
 */
export async function getNextExercise(
  db: any,
  userId: string,
  courseSlug: string,
) {
  // Find concepts that need review (mastery < 0.7 AND review is due)
  const weakConcepts = await db
    .select()
    .from(adaptiveSchema.userMastery)
    .where(
      and(
        eq(adaptiveSchema.userMastery.userId, userId),
        lt(adaptiveSchema.userMastery.mastery, 0.7),
        lte(adaptiveSchema.userMastery.nextReviewAt, new Date()),
      ),
    )
    .orderBy(adaptiveSchema.userMastery.mastery)
    .limit(5)

  if (weakConcepts.length === 0) {
    return null // All concepts mastered
  }

  // Return the weakest concept for the frontend to use
  return {
    conceptTag: weakConcepts[0].conceptTag,
    mastery: weakConcepts[0].mastery,
    suggestion: `Let's practice ${weakConcepts[0].conceptTag.replace(/-/g, ' ')} — you're at ${Math.round(weakConcepts[0].mastery * 100)}% mastery.`,
  }
}

/**
 * Get the full skill map for a course.
 */
export async function getSkillMap(db: any, userId: string) {
  return db
    .select()
    .from(adaptiveSchema.userMastery)
    .where(eq(adaptiveSchema.userMastery.userId, userId))
    .orderBy(adaptiveSchema.userMastery.mastery)
    .all()
}
