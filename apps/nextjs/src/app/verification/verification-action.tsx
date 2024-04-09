// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// import { lucia } from "@feprep/auth";

// export async function verificationAction(_: unknown, formData: FormData) {
//   const emailVerificationCode = await ctx.db.transaction(async (tx) => {
//     const emailVerificationCode =
//       await tx.query.emailVerificationCodes.findFirst({
//         where: (table, { eq }) => eq(table.userId, ctx.user.id),
//       });

//     if (emailVerificationCode) {
//       await tx
//         .delete(emailVerificationCodes)
//         .where(eq(emailVerificationCodes.userId, ctx.user.id));
//     }

//     return emailVerificationCode;
//   });

//   if (!emailVerificationCode || emailVerificationCode.code !== input.code) {
//     return new TRPCError({
//       code: "BAD_REQUEST",
//       message: "Invalid email verification code",
//     });
//   }

//   if (emailVerificationCode.expiresAt < new Date().getSeconds()) {
//     return new TRPCError({
//       code: "BAD_REQUEST",
//       message: "Email verification code has expired",
//     });
//   }

//   if (emailVerificationCode.email !== ctx.user.email) {
//     return new TRPCError({
//       code: "BAD_REQUEST",
//       message: "Email verification code does not match user",
//     });
//   }

//   await lucia.invalidateUserSessions(ctx.user.id);
//   await ctx.db
//     .update(users)
//     .set({ emailVerified: true })
//     .where(eq(users.id, ctx.user.id));

//   const session = await lucia.createSession(ctx.user.id, {});
//   const sessionCookie = lucia.createSessionCookie(session.id);
//   cookies().set(
//     sessionCookie.name,
//     sessionCookie.value,
//     sessionCookie.attributes,
//   );
// }
