import { TRPCError } from "@trpc/server";
import { createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

import { generateId, lucia, Scrypt, TimeSpan } from "@feprep/auth";
import {
  db,
  emailVerificationCodes,
  eq,
  passwordResetTokens,
  users,
} from "@feprep/db";
import {
  renderEmailVerification,
  renderResetPassword,
  resend,
} from "@feprep/transactional";
import {
  ResetPasswordSchema,
  SendResetPasswordEmailSchema,
  SignInSchema,
  SignUpFormSchema,
  VerifyEmailSchema,
} from "@feprep/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(SignUpFormSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const email = `${input.nid}@ucf.edu`;
      const existingUser = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
      });

      if (existingUser) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }

      const hashedPassword = await new Scrypt().hash(input.password);
      const userId = generateId(15);

      await ctx.db.insert(users).values({
        id: userId,
        email: email,
        hashedPassword: hashedPassword,
      });

      try {
        const verificationCode = await generateEmailVerificationCode(
          userId,
          email,
        );
        await resend.emails.send({
          to: email,
          from: "team@feprep.org",
          subject: "Verify your email",
          html: renderEmailVerification(verificationCode),
        });
      } catch {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send verification email",
        });
      }

      const session = await lucia.createSession(userId, {});

      return { session: session.id, userId: userId };
    }),
  signIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const { nid, password } = input;
      const email = `${nid}@ucf.edu`;

      // Check if user exists
      const user = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
      });

      if (!user) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid nid or password",
        });
      }

      const validPassword = await new Scrypt().verify(
        user.hashedPassword,
        password,
      );

      if (!validPassword) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid nid or password",
        });
      }

      const session = await lucia.createSession(user.id, {});

      return { session: session.id, userId: user.id };
    }),
  verifyEmail: protectedProcedure
    .input(VerifyEmailSchema)
    .mutation(async ({ ctx, input }) => {
      const emailVerificationCode = await ctx.db.transaction(async (tx) => {
        const emailVerificationCode =
          await tx.query.emailVerificationCodes.findFirst({
            where: (table, { eq }) => eq(table.userId, ctx.user.id),
          });

        if (emailVerificationCode) {
          await tx
            .delete(emailVerificationCodes)
            .where(eq(emailVerificationCodes.userId, ctx.user.id));
        }

        return emailVerificationCode;
      });

      if (!emailVerificationCode || emailVerificationCode.code !== input.code) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email verification code",
        });
      }

      if (emailVerificationCode.expiresAt < new Date().getTime()) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Email verification code has expired",
        });
      }

      if (emailVerificationCode.email !== ctx.user.email) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Email verification code does not match user",
        });
      }

      await lucia.invalidateUserSessions(ctx.user.id);
      await ctx.db
        .update(users)
        .set({ emailVerified: true })
        .where(eq(users.id, ctx.user.id));

      const session = await lucia.createSession(ctx.user.id, {});

      return { session: session.id, userId: ctx.user.id };
    }),
  sendResetPassWordEmail: publicProcedure
    .input(SendResetPasswordEmailSchema)
    .mutation(async ({ ctx, input }) => {
      const email = `${input.nid}@ucf.edu`;

      const user = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
      });

      if (!user?.emailVerified) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email",
        });
      }

      const passwordResetToken = await generatePasswordResetToken(user.id);

      const resetPasswordLink = `${process.env.APP_URL}/reset-password/${passwordResetToken}`;

      try {
        await resend.emails.send({
          from: "team@feprep.org",
          to: email,
          subject: "Reset your password",
          html: renderResetPassword(resetPasswordLink),
        });

        return { success: true };
      } catch (e) {
        return new TRPCError({
          message: "Failed to send verification email",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  resetPassword: publicProcedure
    .input(ResetPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { token, password } = input;

      const passwordResetToken = await ctx.db.transaction(async (tx) => {
        const passwordResetToken = await tx.query.passwordResetTokens.findFirst(
          {
            where: (table, { eq }) => eq(table.id, token),
          },
        );

        if (passwordResetToken) {
          await tx
            .delete(passwordResetTokens)
            .where(eq(passwordResetTokens.id, token));
        }

        return passwordResetToken;
      });

      if (!passwordResetToken) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid password reset link",
        });
      }

      if (passwordResetToken.expiresAt < new Date().getTime()) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Password reset link has expired",
        });
      }

      await lucia.invalidateUserSessions(passwordResetToken.userId);
      const hashedPassword = await new Scrypt().hash(password);

      await ctx.db
        .update(users)
        .set({ hashedPassword })
        .where(eq(users.id, passwordResetToken.userId));

      const session = await lucia.createSession(passwordResetToken.userId, {});

      return { session: session.id, userId: passwordResetToken.userId };
    }),
  sendEmailVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    const lastEmailVerificationCode =
      await ctx.db.query.emailVerificationCodes.findFirst({
        where: eq(emailVerificationCodes.userId, ctx.user.id),
        columns: { expiresAt: true },
      });

    if (
      lastEmailVerificationCode &&
      lastEmailVerificationCode.expiresAt > new Date().getTime()
    ) {
      return new TRPCError({
        code: "BAD_REQUEST",
        message: `Email verification code already sent. Please wait ${lastEmailVerificationCode.expiresAt} seconds`,
      });
    }

    try {
      const verificationCode = await generateEmailVerificationCode(
        ctx.user.id,
        ctx.user.email,
      );
      await resend.emails.send({
        to: ctx.user.email,
        from: "team@feprep.org",
        subject: "Verify your email",
        html: renderEmailVerification(verificationCode),
      });
    } catch {
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send verification email",
      });
    }
  }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await lucia.invalidateSession(ctx.session.id);
  }),
});

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
    expiresAt: createDate(new TimeSpan(2, "h")).getTime(),
  });
  return tokenId;
}

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
    expiresAt: createDate(new TimeSpan(10, "m")).getTime(),
  });
  return code;
}
