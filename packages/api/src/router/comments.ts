import { z } from "zod";

import { comments, eq } from "@feprep/db";
import { CommentSchema, UpdateCommentSchema } from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({
  create: publicProcedure
    .input(CommentSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(comments)
        .values({
          questionId: input.questionId,
          userId: input.userId,
          content: input.content,
        })
        .returning();
    }),

  read: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.comments.findMany({
      where: eq(comments.id, input),
    });
  }),

  update: publicProcedure
    .input(UpdateCommentSchema)
    .mutation(async ({ ctx, input: { id, ...comment } }) => {
      return await ctx.db
        .update(comments)
        .set(comment)
        .where(eq(comments.id, id));
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(comments).where(eq(comments.id, input));
  }),
});
