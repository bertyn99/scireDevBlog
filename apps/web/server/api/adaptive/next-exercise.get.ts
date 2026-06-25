import { getNextExercise } from '~~/server/utils/adaptive-engine'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const db = hubDb()
    const query = getQuery(event)
    const courseSlug = query.course as string || 'css-fundamentals'
    const { user } = await requireUserSession(event)
    const userId = user.id
    log.set({ userId, courseSlug })

    const next = await getNextExercise(db, userId, courseSlug)
    log.info('exercise.next_fetched', { courseSlug, hasNext: !!next })
    return next ?? { message: 'All concepts mastered! Try the next course.' }
  } catch (error) {
    log.error(error, { step: 'next_exercise' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch next exercise' })
  }
})
