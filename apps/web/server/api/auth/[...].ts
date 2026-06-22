import { createAuth } from '../../../server/auth'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  const db = hubDb()
  const auth = createAuth(db)
  log.set({ authPath: event.path })
  return auth.handler(toWebRequest(event))
})
