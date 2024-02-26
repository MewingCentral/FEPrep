import { migrate } from "drizzle-orm/libsql/migrator";

import { db } from ".";

await migrate(db, { migrationsFolder: "./migrations" });
