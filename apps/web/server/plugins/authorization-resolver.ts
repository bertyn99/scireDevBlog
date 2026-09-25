export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const session = await getUserSession(event).catch(() => null)
    event.context.$authorization = {
      resolveServerUser: () => session?.user ?? null,
    }
  })
})
