import { authRouter } from "./router/auth";
import { flashcardsRouter } from "./router/flashcards";
import { questionsRouter } from "./router/questions";
import { usersRouter } from "./router/users";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "hewwo world"),
  users: usersRouter,
  auth: authRouter,
  questions: questionsRouter,
  flashcards: flashcardsRouter,
});

export type AppRouter = typeof appRouter;
