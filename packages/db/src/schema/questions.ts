import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const questions = sqliteTable("question", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const resources = sqliteTable("resource", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  link: text("link").notNull(),
});

export const comments = sqliteTable("comment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
});

export const flashcardPacks = sqliteTable("flashcard_pack", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const flashcards = sqliteTable("flashcard", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  packId: text("flashcard_pack_id")
    .notNull()
    .references(() => flashcardPacks.id),
  front: text("front"),
  back: text("back"),
});
