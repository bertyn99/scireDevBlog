import { updateMasteryForAttempt } from '~~/server/utils/adaptive-engine'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const db = hubDb()
    const { exerciseId, conceptTags, passed, timeSeconds, hintsUsed } = await readBody(event)
    const { user } = await requireUserSession(event)
    const userId = user.id
    log.set({ userId, exerciseId, conceptTags })

    await updateMasteryForAttempt(
      db,
      userId,
      conceptTags || [],
      passed || false,
      timeSeconds || 0,
      hintsUsed || 0,
    )

    log.info('mastery.updated', { exerciseId, passed })
    return { success: true }
  } catch (error) {
    log.error(error, { step: 'mastery_update' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to update mastery' })
  }
})
