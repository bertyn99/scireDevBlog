import { getNextExercise } from '~~/server/utils/adaptive-engine'

export default defineEventHandler(async (event) => {
  const db = hubDb()
  const query = getQuery(event)
  const courseSlug = query.course as string || 'css-fundamentals'
  const userId = 'demo-user' // TODO: get from session

  const next = await getNextExercise(db, userId, courseSlug)
  return next ?? { message: 'All concepts mastered! Try the next course.' }
})
