import { eq, and } from 'drizzle-orm'
import * as progressSchema from '~~/server/db/schema/progress'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { user } = await requireUserSession(event)
    const { lessonPath } = await readBody(event)
    const db = hubDb()
    log.set({ lessonPath, userId: user.id })

    await db.update(progressSchema.lessonProgress)
      .set({ status: 'completed', completedAt: new Date() })
      .where(
        and(
          eq(progressSchema.lessonProgress.userId, user.id),
          eq(progressSchema.lessonProgress.lessonPath, lessonPath),
        ),
      )

    log.info('lesson.completed', { lessonPath })
    return { success: true }
  } catch (error) {
    log.error(error, { step: 'lesson_complete' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to complete lesson' })
  }
})
