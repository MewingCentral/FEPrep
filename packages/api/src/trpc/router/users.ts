import { createTRPCRouter, publicProcedure } from "..";

// TODO: make this protected
export const usersRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
});
