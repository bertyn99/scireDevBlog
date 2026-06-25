import { eq, desc } from 'drizzle-orm'
import * as progressSchema from '~~/server/db/schema/progress'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { user } = await requireUserSession(event)
    const db = hubDb()
    log.set({ userId: user.id })

    const [lastLesson] = await db.select({
      lessonPath: progressSchema.lessonProgress.lessonPath,
      courseSlug: progressSchema.lessonProgress.courseSlug,
      status: progressSchema.lessonProgress.status,
      startedAt: progressSchema.lessonProgress.startedAt,
    })
      .from(progressSchema.lessonProgress)
      .where(eq(progressSchema.lessonProgress.userId, user.id))
      .orderBy(desc(progressSchema.lessonProgress.startedAt))
      .limit(1)

    log.info('progress.last_lesson_fetched', { found: !!lastLesson })

    if (!lastLesson) {
      return {}
    }

    return {
      lessonSlug: lastLesson.lessonPath,
      courseSlug: lastLesson.courseSlug,
      lessonTitle: null,
      status: lastLesson.status,
    }
  } catch (error) {
    log.error(error, { step: 'progress_last_lesson' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch last lesson' })
  }
})
