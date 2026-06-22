import { eq, and } from 'drizzle-orm'
import * as progressSchema from '~~/server/db/schema/progress'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { lessonPath, courseSlug } = await readBody(event)
    const db = hubDb()
    log.set({ lessonPath, courseSlug, userId: 'temp' })

    // Upsert lesson progress
    await db.insert(progressSchema.lessonProgress).values({
      userId: 'temp', // TODO: get from session
      lessonPath,
      courseSlug,
      status: 'in_progress',
      startedAt: new Date(),
    }).onConflictDoUpdate({
      target: [progressSchema.lessonProgress.userId, progressSchema.lessonProgress.lessonPath],
      set: { status: 'in_progress' },
    })

    // Also mark course as in_progress
    await db.insert(progressSchema.courseProgress).values({
      userId: 'temp',
      courseSlug,
      status: 'in_progress',
      startedAt: new Date(),
    }).onConflictDoUpdate({
      target: [progressSchema.courseProgress.userId, progressSchema.courseProgress.courseSlug],
      set: { status: 'in_progress' },
    })

    log.info('lesson.started', { lessonPath, courseSlug })
    return { success: true }
  } catch (error) {
    log.error(error, { step: 'lesson_start' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to start lesson' })
  }
})
