import { eq, lte, asc, isNotNull, and } from 'drizzle-orm'
import * as adaptiveSchema from '~~/server/db/schema/adaptive'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const { user } = await requireUserSession(event)
    const db = hubDb()
    log.set({ userId: user.id })

    const dueConcepts = await db.select({
      conceptTag: adaptiveSchema.userMastery.conceptTag,
      nextReviewAt: adaptiveSchema.userMastery.nextReviewAt,
      mastery: adaptiveSchema.userMastery.mastery,
    })
      .from(adaptiveSchema.userMastery)
      .where(
        and(
          eq(adaptiveSchema.userMastery.userId, user.id),
          isNotNull(adaptiveSchema.userMastery.nextReviewAt),
          lte(adaptiveSchema.userMastery.nextReviewAt, new Date()),
        ),
      )
      .orderBy(asc(adaptiveSchema.userMastery.nextReviewAt))

    log.info('adaptive.review_queue_fetched', { count: dueConcepts.length })

    return dueConcepts.map(c => ({
      conceptTag: c.conceptTag,
      nextReviewAt: c.nextReviewAt ? c.nextReviewAt.getTime() : 0,
      mastery: c.mastery ?? 0,
    }))
  } catch (error) {
    log.error(error, { step: 'adaptive_review_queue' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch review queue' })
  }
})
