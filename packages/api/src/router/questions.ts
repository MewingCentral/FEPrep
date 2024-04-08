import { z } from "zod";

import { TOPICS } from "@feprep/consts";
import { count, eq, questions } from "@feprep/db";
import { CreateQuestionSchema, UpdateQuestionSchema } from "@feprep/validators";

import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const questionsRouter = createTRPCRouter({
  count: publicProcedure.query(async ({ ctx }) => {
    const question = (
      await ctx.db
        .select({
          value: count(),
        })
        .from(questions)
    )[0];

    if (!question) {
      throw new Error("Failed to count questions");
    }

    return question.value;
  }),
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
  byTopic: publicProcedure.input(z.enum(TOPICS)).query(({ ctx, input }) => {
    return ctx.db.query.questions.findMany({
      where: eq(questions.topic, input),
    });
  }),
});
