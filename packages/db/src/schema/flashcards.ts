import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const flashcardPacks = sqliteTable("flashcard_pack", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  isPublic: integer("is_public", { mode: "boolean" }).notNull(),
});

export const flashcards = sqliteTable("flashcard", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  packId: integer("flashcard_pack_id")
    .notNull()
    .references(() => flashcardPacks.id),
  front: text("front").notNull(),
  back: text("back").notNull(),
});
