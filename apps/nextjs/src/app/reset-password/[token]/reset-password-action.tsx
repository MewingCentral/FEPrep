"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, Scrypt } from "@feprep/auth";
import { db, eq, passwordResetTokens, users } from "@feprep/db";
import { ResetPasswordSchema } from "@feprep/validators";

export async function resetPasswordAction(_: unknown, formData: FormData) {
  const object = Object.fromEntries(formData.entries());
  const parsed = ResetPasswordSchema.safeParse(object);

  if (!parsed.success) {
    return {
      fieldError: {
        password: parsed.error.flatten().fieldErrors.password?.[0],
      },
    };
  }

  const { token, password } = parsed.data;

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
    return {
      error: "Invalid password reset link",
    };
  }

  if (passwordResetToken.expiresAt < new Date().getSeconds()) {
    return {
      error: "Password reset link has expired",
    };
  }

  await lucia.invalidateUserSessions(passwordResetToken.userId);
  const hashedPassword = await new Scrypt().hash(password);

  await db
    .update(users)
    .set({ hashedPassword })
    .where(eq(users.id, passwordResetToken.userId));

  const session = await lucia.createSession(passwordResetToken.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/sign-in");
}
