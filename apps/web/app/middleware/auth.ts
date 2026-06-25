export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, ready } = useUserSession()

  // Wait for session to be fetched on client
  if (import.meta.client && !ready.value) {
    await new Promise<void>((resolve) => {
      const stop = watch(ready, (isReady) => {
        if (isReady) {
          stop()
          resolve()
        }
      }, { immediate: true })
    })
  }

  if (!loggedIn.value) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})
