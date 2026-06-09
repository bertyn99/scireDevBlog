import { updateMasteryForAttempt } from '~~/server/utils/adaptive-engine'

export default defineEventHandler(async (event) => {
  const db = hubDb()
  const { exerciseId, conceptTags, passed, timeSeconds, hintsUsed } = await readBody(event)
  const userId = 'demo-user' // TODO: get from session

  await updateMasteryForAttempt(
    db,
    userId,
    conceptTags || [],
    passed || false,
    timeSeconds || 0,
    hintsUsed || 0,
  )

  return { success: true }
})
