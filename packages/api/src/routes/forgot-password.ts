import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createDate, TimeSpan } from "oslo";

import { generateId } from "@feprep/auth";
import { db, eq, passwordResetTokens } from "@feprep/db";
import { renderResetPassword, resend } from "@feprep/transactional";
import { ForgotPasswordSchema } from "@feprep/validators";

export const forgotPassword = new Hono().post(
  "/",
  zValidator("json", ForgotPasswordSchema),
  async (c) => {
    const { email } = c.req.valid("json");
    const user = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user?.emailVerified) {
      return c.json({ error: "Invalid email" }, 400);
    }

    const passwordResetToken = await generatePasswordResetToken(user.id);

    const resetPasswordLink = `${process.env.APP_URL}/reset-password?token=${passwordResetToken}`;

    try {
      await resend.emails.send({
        from: "team@feprep.org",
        to: email,
        subject: "Reset your password",
        html: renderResetPassword(resetPasswordLink),
      });

      return c.json({ success: true });
    } catch (e) {
      return c.json({ error: "Failed to send verification email" }, 500);
    }
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
