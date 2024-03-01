import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

import { generateId, lucia, Scrypt } from "@feprep/auth";
import {
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
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyEmailSchema,
} from "@feprep/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { generatePasswordResetToken } from "../../routes/forgot-password";
import { generateEmailVerificationCode } from "../../routes/sign-up";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, input.email),
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
        email: input.email,
        hashedPassword: hashedPassword,
      });

      try {
        const verificationCode = await generateEmailVerificationCode(
          userId,
          input.email,
        );
        await resend.emails.send({
          to: input.email,
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
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { session: session.id, userId: userId };
    }),
  signIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      // Check if user exists
      const user = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
      });

      if (!user) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password",
        });
      }

      const validPassword = await new Scrypt().verify(
        user.hashedPassword,
        password,
      );

      if (!validPassword) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password",
        });
      }

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { session: session.id, userId: user.id };
    }),
  verifiyEmail: protectedProcedure
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

      if (emailVerificationCode.expiresAt < new Date().getSeconds()) {
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
        .set({ emailVerified: 1 })
        .where(eq(users.id, ctx.user.id));

      const session = await lucia.createSession(ctx.user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { session: session.id, userId: ctx.user.id };
    }),
  forgotPassword: publicProcedure
    .input(ForgotPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, input.email),
      });

      if (!user?.emailVerified) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email",
        });
      }

      const passwordResetToken = await generatePasswordResetToken(user.id);

      const resetPasswordLink = `${process.env.APP_URL}/reset-password?token=${passwordResetToken}`;

      try {
        await resend.emails.send({
          from: "team@feprep.org",
          to: input.email,
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

      if (passwordResetToken.expiresAt < new Date().getSeconds()) {
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
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { session: session.id, userId: passwordResetToken.userId };
    }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
