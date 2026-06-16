import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'

// Course-level progress
export const courseProgress = sqliteTable('course_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  courseSlug: text('course_slug').notNull(),
  // e.g., "css-fundamentals"
  status: text('status').notNull().default('not_started'),
  // 'not_started' | 'in_progress' | 'completed'
  totalLessons: integer('total_lessons').notNull(),
  completedLessons: integer('completed_lessons').notNull().default(0),
  score: integer('score').default(0),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  lastAccessedAt: integer('last_accessed_at', { mode: 'timestamp' }),
})

// Lesson-level progress
export const lessonProgress = sqliteTable('lesson_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  lessonPath: text('lesson_path').notNull(),
  // e.g., "courses/css-fundamentals/02-flexbox/index"
  courseSlug: text('course_slug').notNull(),
  status: text('status').notNull().default('not_started'),
  // 'not_started' | 'in_progress' | 'completed'
  score: integer('score').default(0),
  maxScore: integer('max_score').default(0),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  timeSpentSeconds: integer('time_spent_seconds').default(0),
}, (table) => ({
  userLessonIdx: { unique: { columns: [table.userId, table.lessonPath] } },
}))

// Individual exercise attempts
export const exerciseAttempts = sqliteTable('exercise_attempts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  exerciseId: text('exercise_id').notNull(),
  // e.g., "courses/css-fundamentals/02-flexbox/index#flex-direction-qcm"
  lessonPath: text('lesson_path').notNull(),
  type: text('type').notNull(),
  // 'qcm' | 'graphical' | 'code_challenge' | 'open_question'
  passed: integer('passed', { mode: 'boolean' }).notNull(),
  score: integer('score').default(0),
  maxScore: integer('max_score').default(0),
  attemptNumber: integer('attempt_number').notNull().default(1),
  submittedCode: text('submitted_code'),
  // JSON string of user's code (for code challenges)
  submittedAnswer: text('submitted_answer'),
  // User's selected answer (for QCM/graphical)
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
