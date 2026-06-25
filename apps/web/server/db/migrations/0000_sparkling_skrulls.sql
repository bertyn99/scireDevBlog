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
	`hints_used` integer DEFAULT 0,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
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
	`last_accessed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
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
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
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
	`time_spent_seconds` integer DEFAULT 0,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
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
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text,
	`password` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`avatar_url` text,
	`role` text DEFAULT 'student' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);