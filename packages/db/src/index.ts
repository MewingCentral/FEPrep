import { createClient } from "@libsql/client";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/libsql";

import * as questions from "./schema/questions";
import * as users from "./schema/users";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const schema = { ...users, ...questions };

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

export const adapter = new DrizzleSQLiteAdapter(
  db,
  users.sessions,
  users.users,
);

export * from "./schema/users";
export * from "./schema/questions";
