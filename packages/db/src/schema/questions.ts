import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { SECTIONS, SEMESTERS, TOPICS } from "@feprep/consts";

import { users } from "./users";

export const questions = sqliteTable("question", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title"),
  // PDF or markdown content for the question
  question: text("question").notNull(),
  solution: text("solution").notNull(),
  averageScore: real("average_score").default(0),
  easyVotes: integer("easy_votes").notNull().default(0),
  mediumVotes: integer("medium_votes").notNull().default(0),
  hardVotes: integer("hard_votes").notNull().default(0),
  points: integer("points").default(0),
  semester: text("semester", { enum: SEMESTERS }).notNull(),
  topic: text("topic", { enum: TOPICS }).notNull(),
  section: text("section", { enum: SECTIONS }).notNull(),
  questionNumber: integer("question_number").notNull(),
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
