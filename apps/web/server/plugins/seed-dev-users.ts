import { db } from 'hub:db'
import { users } from '#auth/schema'
import { eq } from 'drizzle-orm'
import { subscriptions } from '~~/server/db/schema/subscriptions'

/**
 * Dev-only seeder.
 *
 * Every fresh Cloud Agent / local dev boot starts from an empty local D1, so
 * this seeds a predictable set of accounts to log in with:
 *   - an admin
 *   - a free student
 *   - a paid student (a `premium`/`active` subscription row; Stripe fields are
 *     left null because the billing flow is not implemented yet)
 *
 * It runs once, lazily, on the first request (migrations are guaranteed applied
 * by then) and is fully idempotent, so re-runs and warm reloads are safe.
 */

type SeedRole = 'admin' | 'student'

interface SeedUser {
  name: string
  email: string
  password: string
  role: SeedRole
  paid?: boolean
}

// Shared dev credentials — safe to hard-code because this only runs in dev.
const DEV_PASSWORD = 'Password123!'

const SEED_USERS: SeedUser[] = [
  { name: 'Admin', email: 'admin@sciredev.dev', password: DEV_PASSWORD, role: 'admin' },
  { name: 'Free Student', email: 'student.free@sciredev.dev', password: DEV_PASSWORD, role: 'student' },
  { name: 'Paid Student', email: 'student.paid@sciredev.dev', password: DEV_PASSWORD, role: 'student', paid: true },
]

async function ensureUser(auth: ReturnType<typeof serverAuth>, seed: SeedUser): Promise<string> {
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, seed.email))
    .limit(1)

  let userId: string
  if (existing.length > 0) {
    userId = existing[0]!.id
  }
  else {
    // signUpEmail creates the user + credential account with a correctly hashed password.
    const result = await auth.api.signUpEmail({
      body: { name: seed.name, email: seed.email, password: seed.password },
    })
    userId = result.user.id
  }

  // Roles other than the default 'student' must be applied explicitly.
  if (seed.role !== 'student') {
    await db.update(users).set({ role: seed.role }).where(eq(users.id, userId))
  }

  return userId
}

async function ensurePaidSubscription(userId: string): Promise<void> {
  const existing = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1)

  if (existing.length > 0) {
    return
  }

  const now = new Date()
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  await db.insert(subscriptions).values({
    userId,
    plan: 'premium',
    status: 'active',
    currentPeriodStart: now,
    currentPeriodEnd: periodEnd,
    createdAt: now,
  })
}

async function seedDevUsers(): Promise<void> {
  const auth = serverAuth()
  for (const seed of SEED_USERS) {
    const userId = await ensureUser(auth, seed)
    if (seed.paid) {
      await ensurePaidSubscription(userId)
    }
  }
}

export default defineNitroPlugin((nitroApp) => {
  if (!import.meta.dev) {
    return
  }

  let started = false
  nitroApp.hooks.hook('request', () => {
    if (started) {
      return
    }
    started = true

    seedDevUsers()
      .then(() => {
        console.info(
          `[seed] dev users ready — admin@sciredev.dev / student.free@sciredev.dev / student.paid@sciredev.dev (password: ${DEV_PASSWORD})`,
        )
      })
      .catch((error) => {
        started = false
        console.error('[seed] failed to seed dev users:', error)
      })
  })
})
