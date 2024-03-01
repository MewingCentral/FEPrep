import { createTRPCRouter, publicProcedure } from "..";
import { authRouter } from "./auth";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "hewwo world"),
  users: usersRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
