import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Better Auth user id from `#auth/schema` (`users.id`)
  userId: text('user_id').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: text('plan').notNull().default('free'),
  // 'free' | 'premium' | 'team'
  status: text('status').notNull().default('active'),
  // 'active' | 'canceled' | 'past_due' | 'incomplete'
  currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
