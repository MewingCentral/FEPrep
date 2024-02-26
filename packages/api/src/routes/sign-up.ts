import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { generateId, lucia, Scrypt } from "@feprep/auth";
import { db, users } from "@feprep/db";
import { SignUpSchema } from "@feprep/validators";

export const signUp = new Hono().post(
  "/",
  zValidator("json", SignUpSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (existingUser) {
      return c.json({ error: "Email already in use" }, 400);
    }

    const hashedPassword = await new Scrypt().hash(password);
    const userId = generateId(15);

    await db.insert(users).values({
      id: userId,
      email: email,
      hashedPassword: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json({ session: session.id, userId: userId });
  },
);
