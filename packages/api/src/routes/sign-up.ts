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
    const hashedPassword = await new Scrypt().hash(password);
    const userId = generateId(15);

    // TODO: check if email is already taken
    await db.insert(users).values({
      email: email,
      id: userId,
      hashedPassword: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json({ success: true });
  },
);
