// defineServerAuth is auto-imported by Nitro — do NOT import from '#auth/server' (circular)

export default defineServerAuth(({ runtimeConfig, db }: { runtimeConfig: any, db: any }) => ({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: runtimeConfig.github.clientId as string,
      clientSecret: runtimeConfig.github.clientSecret as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string' as const,
        defaultValue: 'student',
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
})) as any
