import { createAuth } from '../../../server/auth'

export default defineEventHandler(async (event) => {
  const db = hubDb()
  const auth = createAuth(db)
  return auth.handler(toWebRequest(event))
})
