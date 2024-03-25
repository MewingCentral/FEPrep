import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.questions.findMany();
  }),
});
