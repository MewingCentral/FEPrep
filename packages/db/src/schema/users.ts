import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { USER_TYPES } from "@feprep/consts";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  type: text("type", {
    enum: USER_TYPES,
  })
    .default("Student")
    .notNull(),
});

export type SelectUser = typeof users.$inferSelect;

export const sessions = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const emailVerificationCodes = sqliteTable("email_verification_token", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
  email: text("email").notNull(),
  code: text("code").notNull(),
});

export const passwordResetTokens = sqliteTable("password_reset_token", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});
