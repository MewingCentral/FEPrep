import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { lucia, Scrypt } from "@feprep/auth";
import { db, eq, passwordResetTokens, users } from "@feprep/db";
import { ResetPasswordSchema } from "@feprep/validators";

export const resetPassword = new Hono().post(
  "/",
  zValidator("json", ResetPasswordSchema),
  async (c) => {
    const { token, password } = c.req.valid("json");

    const passwordResetToken = await db.transaction(async (tx) => {
      const passwordResetToken = await tx.query.passwordResetTokens.findFirst({
        where: (table, { eq }) => eq(table.id, token),
      });

      if (passwordResetToken) {
        await tx
          .delete(passwordResetTokens)
          .where(eq(passwordResetTokens.id, token));
      }

      return passwordResetToken;
    });

    if (!passwordResetToken) {
      return c.json({ error: "Invalid password reset link" }, 400);
    }

    if (passwordResetToken.expiresAt < new Date().getSeconds()) {
      return c.json({ error: "Password reset link has expired" }, 400);
    }

    await lucia.invalidateUserSessions(passwordResetToken.userId);
    const hashedPassword = await new Scrypt().hash(password);

    await db
      .update(users)
      .set({ hashedPassword })
      .where(eq(users.id, passwordResetToken.userId));

    const session = await lucia.createSession(passwordResetToken.userId, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json({ session: session.id, userId: passwordResetToken.userId });
  },
);
