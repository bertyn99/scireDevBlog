import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { users } from './users'

// Concept taxonomy
export const concepts = sqliteTable('concepts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  // e.g., 'flex-direction', 'closures'
  parentTopic: text('parent_topic'),
  // e.g., 'css-flexbox', 'js-advanced'
  difficulty: real('difficulty').default(0.5),
  // 0.0 (easy) → 1.0 (hard)
  dependencies: text('dependencies'),
  // JSON array of prerequisite concept names
})

// Per-user mastery per concept
export const userMastery = sqliteTable('user_mastery', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  conceptTag: text('concept_tag').notNull(),
  attempts: integer('attempts').default(0),
  correct: integer('correct').default(0),
  streak: integer('streak').default(0),
  // Consecutive correct answers
  mastery: real('mastery').default(0),
  // 0.0 → 1.0
  lastAttemptAt: integer('last_attempt_at', { mode: 'timestamp' }),
  nextReviewAt: integer('next_review_at', { mode: 'timestamp' }),
  // Spaced repetition timestamp
  avgTimeSeconds: integer('avg_time_seconds'),
  hintsUsed: integer('hints_used').default(0),
}, (table) => ({
  userConceptIdx: { unique: { columns: [table.userId, table.conceptTag] } },
}))
