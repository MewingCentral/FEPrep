import { createTRPCRouter, publicProcedure } from "..";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "hewwo world"),
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
