import { relations, sql } from "drizzle-orm";
import {
  integer,
  real,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

  QUESTION_NUMBERS,

import { users } from "./users";

export const questions = sqliteTable("question", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title"),
  pdf: text("pdf").notNull(),
  averageScore: real("average_score").default(0),
  easyVotes: integer("easy_votes").notNull().default(0),
  mediumVotes: integer("medium_votes").notNull().default(0),
  hardVotes: integer("hard_votes").notNull().default(0),
  points: integer("points").default(0),
  semester: text("semester", { enum: SEMESTERS }).notNull(),
  topic: text("topic", { enum: TOPICS }).notNull(),
  section: text("section", { enum: SECTIONS }).notNull(),
  questionNumber: text("question_number", { enum: QUESTION_NUMBERS }).notNull(),
});

export const resources = sqliteTable("resource", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  link: text("link").notNull(),
  title: text("title").notNull(),
  isVideo: integer("is_video", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
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
  time: text("time")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const votes = sqliteTable(
  "vote",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    questionId: integer("question_id")
      .notNull()
      .references(() => questions.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    vote: text("vote", {
      enum: ["easy", "medium", "hard"],
    }).notNull(),
  },
  (table) => ({
    unique: unique().on(table.userId, table.questionId),
  }),
);
