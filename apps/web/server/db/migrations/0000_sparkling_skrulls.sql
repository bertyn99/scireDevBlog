CREATE TABLE `concepts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent_topic` text,
	`difficulty` real DEFAULT 0.5,
	`dependencies` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `concepts_name_unique` ON `concepts` (`name`);--> statement-breakpoint
CREATE TABLE `user_mastery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`concept_tag` text NOT NULL,
	`attempts` integer DEFAULT 0,
	`correct` integer DEFAULT 0,
	`streak` integer DEFAULT 0,
	`mastery` real DEFAULT 0,
	`last_attempt_at` integer,
	`next_review_at` integer,
	`avg_time_seconds` integer,
	`hints_used` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `course_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`course_slug` text NOT NULL,
	`status` text DEFAULT 'not_started' NOT NULL,
	`total_lessons` integer NOT NULL,
	`completed_lessons` integer DEFAULT 0 NOT NULL,
	`score` integer DEFAULT 0,
	`started_at` integer,
	`completed_at` integer,
	`last_accessed_at` integer
);
--> statement-breakpoint
CREATE TABLE `exercise_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`exercise_id` text NOT NULL,
	`lesson_path` text NOT NULL,
	`type` text NOT NULL,
	`passed` integer NOT NULL,
	`score` integer DEFAULT 0,
	`max_score` integer DEFAULT 0,
	`attempt_number` integer DEFAULT 1 NOT NULL,
	`submitted_code` text,
	`submitted_answer` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`lesson_path` text NOT NULL,
	`course_slug` text NOT NULL,
	`status` text DEFAULT 'not_started' NOT NULL,
	`score` integer DEFAULT 0,
	`max_score` integer DEFAULT 0,
	`started_at` integer,
	`completed_at` integer,
	`time_spent_seconds` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`stripe_customer_id` text,
	`stripe_subscription_id` text,
	`plan` text DEFAULT 'free' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`current_period_start` integer,
	`current_period_end` integer,
	`created_at` integer NOT NULL
);
