export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await useFetch('/api/auth/session')

  if (!session.value?.user) {
    return navigateTo(`/auth/login?redirect=${useRoute().fullPath}`)
  }
})
