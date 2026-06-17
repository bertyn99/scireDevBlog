import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export function createAuth(db: any) {
  const config = useRuntimeConfig()
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      github: {
        clientId: config.githubClientId || '',
        clientSecret: config.githubClientSecret || '',
      },
    },
    session: {
      expiresIn: 30 * 24 * 60 * 60, // 30 days
    },
  })
}
