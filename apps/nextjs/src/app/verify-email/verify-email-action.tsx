"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, validateRequest } from "@feprep/auth";
import { db, emailVerificationCodes, eq, users } from "@feprep/db";
import { VerifyEmailSchema } from "@feprep/validators";

export async function verifyEmailAction(_: unknown, formData: FormData) {
  const object = Object.fromEntries(formData.entries());
  const parsed = VerifyEmailSchema.safeParse(object);

  if (!parsed.success) {
    const error = parsed.error.flatten();
    return {
      fieldError: {
        code: error.fieldErrors.code?.[0],
      },
    };
  }

  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

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

  if (
    !emailVerificationCode ||
    emailVerificationCode.code !== parsed.data.code
  ) {
    return {
      fieldError: {
        code: "Invalid email verification code",
      },
    };
  }

  if (emailVerificationCode.expiresAt < new Date().getTime()) {
    return {
      fieldError: {
        code: "Email verification code has expired",
      },
    };
  }

  if (emailVerificationCode.email !== user.email) {
    return {
      fieldError: {
        code: "Email verification code does not match user",
      },
    };
  }

  await lucia.invalidateUserSessions(user.id);
  await db
    .update(users)
    .set({
      emailVerified: true,
    })
    .where(eq(users.id, user.id));
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/explore");
}
