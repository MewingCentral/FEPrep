import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createDate, TimeSpan } from "oslo";

import { generateId, lucia, Scrypt } from "@feprep/auth";
import { db, eq, passwordResetTokens, users } from "@feprep/db";
import { PasswordResetSchema } from "@feprep/validators";

export const resetPassword = new Hono().post(
  "/",
  zValidator("json", PasswordResetSchema),
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

export async function generatePasswordResetToken(
  userId: string,
): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));
  const tokenId = generateId(40);
  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")).getSeconds(),
  });
  return tokenId;
}
