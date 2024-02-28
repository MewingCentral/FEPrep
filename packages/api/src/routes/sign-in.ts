import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { lucia, Scrypt } from "@feprep/auth";
import { db } from "@feprep/db";
import { SignInSchema } from "@feprep/validators";

export const signIn = new Hono().post(
  "/",
  zValidator("json", SignInSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");
    console.log("email", email);
    console.log("password", password);

    // Check if user exists
    const user = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user) {
      return c.json({ error: "Invalid email or password" }, 400);
    }

    const validPassword = await new Scrypt().verify(
      user.hashedPassword,
      password,
    );

    if (!validPassword) {
      return c.json({ error: "Invalid email or password" }, 400);
    }

    const session = await lucia.createSession(user.id, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json({ session: session.id, userId: user.id });
  },
);
