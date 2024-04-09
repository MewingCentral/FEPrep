"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

import { generateId, lucia, Scrypt, TimeSpan } from "@feprep/auth";
import { db, emailVerificationCodes, eq, users } from "@feprep/db";
import { renderEmailVerification, resend } from "@feprep/transactional";
import { SignUpFormSchema } from "@feprep/validators";

export async function signUpAction(_: unknown, formData: FormData) {
  const object = Object.fromEntries(formData.entries());
  const parsed = SignUpFormSchema.safeParse(object);

  if (!parsed.success) {
    const error = parsed.error.flatten();
    return {
      fieldError: {
        nid: error.fieldErrors.nid?.[0],
        password: error.fieldErrors.password?.[0],
      },
    };
  }

  const { nid, password } = parsed.data;

  const email = `${nid}@ucf.edu`;
  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });

  if (existingUser) {
    return {
      fieldError: {
        nid: "NID is already in use",
      },
    };
  }

  const hashedPassword = await new Scrypt().hash(password);
  const userId = generateId(15);

  await db.insert(users).values({
    id: userId,
    email: email,
    hashedPassword: hashedPassword,
  });

  try {
    const verificationCode = await generateEmailVerificationCode(userId, email);
    await resend.emails.send({
      to: email,
      from: "team@feprep.org",
      subject: "Verify your email",
      html: renderEmailVerification(verificationCode),
    });
  } catch {
    return {
      error: "Failed to send verification email",
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/explore");
}

async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId));
  const code = generateRandomString(8, alphabet("0-9")); // 8 digit code
  await db.insert(emailVerificationCodes).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, "m")).getTime(), // 10 minutes
  });
  return code;
}
