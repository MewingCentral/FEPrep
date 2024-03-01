import { authRouter } from "./router/auth";
import { usersRouter } from "./router/users";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "hewwo world"),
  users: usersRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
