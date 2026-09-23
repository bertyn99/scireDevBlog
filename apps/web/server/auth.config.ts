import { defineServerAuth } from '@nuxtjs/better-auth/config'

export default defineServerAuth(({ runtimeConfig }) => {
  const github = runtimeConfig.github as {
    clientId?: string
    clientSecret?: string
  }

  return {
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      github: {
        clientId: github.clientId || '',
        clientSecret: github.clientSecret || '',
      },
    },
    user: {
      additionalFields: {
        role: {
          type: 'string',
          defaultValue: 'student',
          input: false,
        },
      },
    },
    session: {
      expiresIn: 30 * 24 * 60 * 60,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
    },
  }
})
