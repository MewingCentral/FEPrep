import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

import { generateId, lucia, Scrypt, TimeSpan } from "@feprep/auth";
import { db, emailVerificationCodes, eq, users } from "@feprep/db";
import { renderEmailVerification, resend } from "@feprep/transactional";
import { SignUpSchema } from "@feprep/validators";

export const signUp = new Hono().post(
  "/",
  zValidator("json", SignUpSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");
    console.log("email", email);
    console.log("password", password);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (existingUser) {
      return c.json({ error: "Email already in use" }, 400);
    }

    const hashedPassword = await new Scrypt().hash(password);
    const userId = generateId(15);

    await db.insert(users).values({
      id: userId,
      email: email,
      hashedPassword: hashedPassword,
    });

    const verificationCode = await generateEmailVerificationCode(userId, email);
    await resend.emails.send({
      to: email,
      from: "team@feprep.org",
      subject: "Verify your email",
      html: renderEmailVerification(verificationCode),
    });

    const session = await lucia.createSession(userId, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json({ session: session.id, userId: userId });
  },
);

export async function generateEmailVerificationCode(
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
    expiresAt: createDate(new TimeSpan(10, "m")).getSeconds(), // 10 minutes
  });
  return code;
}
