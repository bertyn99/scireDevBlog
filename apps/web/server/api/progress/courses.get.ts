import { eq } from 'drizzle-orm'
import * as progressSchema from '~~/server/db/schema/progress'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { user } = await requireUserSession(event)
    const db = hubDb()
    log.set({ userId: user.id })

    const courses = await db.select({
      courseSlug: progressSchema.courseProgress.courseSlug,
      status: progressSchema.courseProgress.status,
      completedLessons: progressSchema.courseProgress.completedLessons,
      totalLessons: progressSchema.courseProgress.totalLessons,
      lastAccessedAt: progressSchema.courseProgress.lastAccessedAt,
    })
      .from(progressSchema.courseProgress)
      .where(eq(progressSchema.courseProgress.userId, user.id))

    log.info('progress.courses_fetched', { count: courses.length })

    return courses.map(c => ({
      courseSlug: c.courseSlug,
      status: c.status,
      completedLessons: c.completedLessons,
      totalLessons: c.totalLessons,
      lastAccessedAt: c.lastAccessedAt ? c.lastAccessedAt.getTime() : null,
    }))
  } catch (error) {
    log.error(error, { step: 'progress_courses' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch course progress' })
  }
})
