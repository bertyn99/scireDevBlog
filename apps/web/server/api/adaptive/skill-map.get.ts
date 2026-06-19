import { getSkillMap } from '~~/server/utils/adaptive-engine'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  try {
    const db = hubDb()
    // TODO: get real userId from session
    const userId = 'demo-user'
    log.set({ userId })

    const skillMap = await getSkillMap(db, userId)
    log.info('skillmap.fetched', { nodeCount: Object.keys(skillMap).length })
    return skillMap
  } catch (error) {
    log.error(error, { step: 'skill_map' })
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch skill map' })
  }
})
