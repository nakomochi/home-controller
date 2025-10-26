CREATE TABLE `devices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`ip` text NOT NULL,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `session` (
	`device_id` integer NOT NULL,
	`token` text NOT NULL
);
