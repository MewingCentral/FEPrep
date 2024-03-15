/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
ALTER TABLE question ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE question ADD `solution` text NOT NULL;--> statement-breakpoint
ALTER TABLE question ADD `average_score` real DEFAULT 0;--> statement-breakpoint
ALTER TABLE question ADD `easy_votes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE question ADD `medium_votes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE question ADD `hard_votes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE question ADD `points` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE question ADD `semester` text NOT NULL;--> statement-breakpoint
ALTER TABLE question ADD `topic` text NOT NULL;--> statement-breakpoint
ALTER TABLE `question` DROP COLUMN `answer`;