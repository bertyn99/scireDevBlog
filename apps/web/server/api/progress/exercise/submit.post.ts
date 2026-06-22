import { eq, and } from 'drizzle-orm'
import * as progressSchema from '~~/server/db/schema/progress'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { exerciseId, lessonPath, type, passed, score, maxScore, submittedCode, submittedAnswer } = await readBody(event)
    const db = hubDb()
    log.set({ exerciseId, lessonPath, userId: 'temp' })

    // Get current attempt number
    const previous = await db.select({ count: progressSchema.exerciseAttempts.attemptNumber })
      .from(progressSchema.exerciseAttempts)
      .where(
        and(
          eq(progressSchema.exerciseAttempts.userId, 'temp'),
          eq(progressSchema.exerciseAttempts.exerciseId, exerciseId),
        ),
      )
      .orderBy(progressSchema.exerciseAttempts.attemptNumber, 'desc')
      .limit(1)

    const attemptNumber = (previous[0]?.count ?? 0) + 1

    await db.insert(progressSchema.exerciseAttempts).values({
      userId: 'temp',
      exerciseId,
      lessonPath,
      type,
      passed,
      score,
      maxScore,
      attemptNumber,
      submittedCode: submittedCode ? JSON.stringify(submittedCode) : null,
      submittedAnswer: submittedAnswer ? JSON.stringify(submittedAnswer) : null,
      createdAt: new Date(),
    })

    log.info('exercise.submitted', { attemptNumber, passed, score })
    return { success: true, attemptNumber }
  } catch (error) {
    log.error(error, { step: 'exercise_submit' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to submit exercise' })
  }
})
