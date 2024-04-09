"use server";

import { redirect } from "next/navigation";
import { generateEmailVerificationCode } from "node_modules/@feprep/api/src/router/auth";

import { validateRequest } from "@feprep/auth";
import { db, emailVerificationCodes, eq } from "@feprep/db";
import { renderEmailVerification, resend } from "@feprep/transactional";

export async function sendEmailVerificationEmailAction() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  const lastEmailVerificationCode =
    await db.query.emailVerificationCodes.findFirst({
      where: eq(emailVerificationCodes.userId, user.id),
      columns: { expiresAt: true },
    });

  if (
    lastEmailVerificationCode &&
    lastEmailVerificationCode.expiresAt > new Date().getTime()
  ) {
    const currentTime = new Date().getTime();
    const expiresAt = lastEmailVerificationCode.expiresAt;
    const waitTimeInSeconds = Math.ceil((expiresAt - currentTime) / 1000);
    return {
      error: `Email verification code already sent. Please wait ${waitTimeInSeconds} seconds`,
    };
  }

  try {
    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );
    await resend.emails.send({
      to: user.email,
      from: "team@feprep.org",
      subject: "Verify your email",
      html: renderEmailVerification(verificationCode),
    });
  } catch {
    return {
      error: "Failed to send verification email",
    };
  }

  return {
    success: true,
  };
}
