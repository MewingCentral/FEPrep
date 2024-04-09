"use server";

import { createDate } from "oslo";

import { generateId, TimeSpan } from "@feprep/auth";
import { db, eq, passwordResetTokens } from "@feprep/db";
import { renderResetPassword, resend } from "@feprep/transactional";
import { SendResetPasswordEmailSchema } from "@feprep/validators";

export async function sendResetPasswordEmailAction(
  _: unknown,
  formData: FormData,
) {
  const object = Object.fromEntries(formData.entries());
  const parsed = SendResetPasswordEmailSchema.safeParse(object);

  if (!parsed.success) {
    return {
      fieldError: {
        nid: parsed.error.flatten().fieldErrors.nid?.[0],
      },
    };
  }

  const { nid } = parsed.data;

  const email = `${nid}@ucf.edu`;

  const user = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });

  if (!user?.emailVerified) {
    return {
      fieldError: {
        nid: "Invalid nid",
      },
    };
  }

  const passwordResetToken = await generatePasswordResetToken(user.id);

  const resetPasswordLink = `${process.env.APP_URL}/reset-password/${passwordResetToken}`;

  try {
    await resend.emails.send({
      from: "team@feprep.org",
      to: user.email,
      subject: "Reset your password",
      html: renderResetPassword(resetPasswordLink),
    });

    return {
      success: true,
    };
  } catch (e) {
    return {
      error: "Failed to send verification email",
    };
  }
}

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
    expiresAt: createDate(new TimeSpan(60, "m")).getTime(),
  });
  return tokenId;
}
