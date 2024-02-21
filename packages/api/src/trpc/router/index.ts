import { createTRPCRouter, publicProcedure } from "..";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "Hello, World!"),
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
