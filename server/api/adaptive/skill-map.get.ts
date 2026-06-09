import { getSkillMap } from '~~/server/utils/adaptive-engine'

export default defineEventHandler(async (event) => {
  const db = hubDb()
  // TODO: get real userId from session
  const userId = 'demo-user'

  const skillMap = await getSkillMap(db, userId)
  return skillMap
})
