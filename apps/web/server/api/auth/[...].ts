export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  const auth = serverAuth()
  log.set({ authPath: event.path })
  return auth.handler(toWebRequest(event))
})
