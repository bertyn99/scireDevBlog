import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema/users'
import * as progressSchema from './schema/progress'
import * as adaptiveSchema from './schema/adaptive'
import * as subscriptionsSchema from './schema/subscriptions'

export function createDb(d1Binding: D1Database) {
  return drizzle(d1Binding, {
    schema: {
      ...schema,
      ...progressSchema,
      ...adaptiveSchema,
      ...subscriptionsSchema,
    },
  })
}

export type Db = ReturnType<typeof createDb>
