import { eq, desc, and } from 'drizzle-orm'
import * as progressSchema from '~~/server/db/schema/progress'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { user } = await requireUserSession(event)
    const db = hubDb()
    log.set({ userId: user.id })

    // Fetch recent exercise attempts
    const recentAttempts = await db.select({
      type: progressSchema.exerciseAttempts.type,
      exerciseId: progressSchema.exerciseAttempts.exerciseId,
      passed: progressSchema.exerciseAttempts.passed,
      createdAt: progressSchema.exerciseAttempts.createdAt,
    })
      .from(progressSchema.exerciseAttempts)
      .where(eq(progressSchema.exerciseAttempts.userId, user.id))
      .orderBy(desc(progressSchema.exerciseAttempts.createdAt))
      .limit(10)

    // Fetch recent lesson completions
    const recentLessons = await db.select({
      lessonPath: progressSchema.lessonProgress.lessonPath,
      completedAt: progressSchema.lessonProgress.completedAt,
    })
      .from(progressSchema.lessonProgress)
      .where(
        and(
          eq(progressSchema.lessonProgress.userId, user.id),
          eq(progressSchema.lessonProgress.status, 'completed'),
        ),
      )
      .orderBy(desc(progressSchema.lessonProgress.completedAt))
      .limit(5)

    // Merge into unified activity feed
    const activities: Array<{ type: string, description: string, timestamp: number }> = []

    for (const attempt of recentAttempts) {
      activities.push({
        type: attempt.passed ? 'exercise_passed' : 'exercise_failed',
        description: `${attempt.type}: ${attempt.exerciseId}`,
        timestamp: attempt.createdAt ? attempt.createdAt.getTime() : 0,
      })
    }

    for (const lesson of recentLessons) {
      activities.push({
        type: 'lesson_completed',
        description: `Completed: ${lesson.lessonPath}`,
        timestamp: lesson.completedAt ? lesson.completedAt.getTime() : 0,
      })
    }

    // Sort by timestamp descending (most recent first)
    activities.sort((a, b) => b.timestamp - a.timestamp)

    log.info('progress.activity_fetched', { count: activities.length })

    return activities.slice(0, 15)
  } catch (error) {
    log.error(error, { step: 'progress_activity' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch activity feed' })
  }
})
