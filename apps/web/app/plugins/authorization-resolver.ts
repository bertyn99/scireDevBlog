export default defineNuxtPlugin({
  name: 'authorization-resolver',
  parallel: true,
  setup() {
    const { user } = useUserSession()

    return {
      provide: {
        authorization: {
          resolveClientUser: () => user.value,
        },
      },
    }
  },
})
