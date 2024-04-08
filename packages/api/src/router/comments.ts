import { z } from "zod";

import { comments, eq } from "@feprep/db";
import { CreateCommentSchema, UpdateCommentSchema } from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateCommentSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(comments).values({
        questionId: input.questionId,
        userId: input.userId,
        content: input.content,
      });
    }),
  allByQuestionId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.comments.findMany({
      where: eq(comments.questionId, input),
      with: {
        user: true,
      },
    });
  }),
  update: publicProcedure
    .input(UpdateCommentSchema)
    .mutation(async ({ ctx, input: { commentId: id, ...comment } }) => {
      await ctx.db.update(comments).set(comment).where(eq(comments.id, id));
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(comments).where(eq(comments.id, input));
  }),
});
