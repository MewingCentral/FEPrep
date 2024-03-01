import { createTRPCRouter, protectedProcedure } from "../trpc";

// TODO: make this protected
export const usersRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
});
