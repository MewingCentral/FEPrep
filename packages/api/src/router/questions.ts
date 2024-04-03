import { z } from "zod";

import { eq, questions } from "@feprep/db";
import { CreateQuestionSchema, UpdateQuestionSchema } from "@feprep/validators";

import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const questionsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.questions.findMany();
  }),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(questions).where(eq(questions.id, input));
  }),
  create: adminProcedure
    .input(CreateQuestionSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(questions).values(input);
    }),
  update: adminProcedure
    .input(UpdateQuestionSchema)
    .mutation(({ ctx, input: { questionId, ...question } }) => {
      return ctx.db
        .update(questions)
        .set(question)
        .where(eq(questions.id, questionId));
    }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.questions.findFirst({
      where: eq(questions.id, input),
    });
  }),
});
