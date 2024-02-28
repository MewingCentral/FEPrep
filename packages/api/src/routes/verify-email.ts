import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { lucia } from "@feprep/auth";
import { db, emailVerificationCodes, eq, users } from "@feprep/db";
import { VerifyEmailSchema } from "@feprep/validators";

import type { Variables } from "../config";

export const verifyEmail = new Hono<{ Variables: Variables }>().post(
  "/",
  zValidator("json", VerifyEmailSchema),
  async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const { code } = c.req.valid("json");

    const emailVerificationCode = await db.transaction(async (tx) => {
      const emailVerificationCode =
        await tx.query.emailVerificationCodes.findFirst({
          where: (table, { eq }) => eq(table.userId, user.id),
        });

      if (emailVerificationCode) {
        await tx
          .delete(emailVerificationCodes)
          .where(eq(emailVerificationCodes.userId, user.id));
      }

      return emailVerificationCode;
    });

    if (!emailVerificationCode || emailVerificationCode.code !== code) {
      return c.json({ error: "Invalid email verification code" }, 400);
    }

    if (emailVerificationCode.expiresAt < new Date().getSeconds()) {
      return c.json({ error: "Email verification code has expired" }, 400);
    }

    if (emailVerificationCode.email !== user.email) {
      return c.json(
        { error: "Email verification code does not match user" },
        400,
      );
    }

    await lucia.invalidateUserSessions(user.id);
    await db
      .update(users)
      .set({ emailVerified: 1 })
      .where(eq(users.id, user.id));

    const session = await lucia.createSession(user.id, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json({ session: session.id, userId: user.id });
  },
);
