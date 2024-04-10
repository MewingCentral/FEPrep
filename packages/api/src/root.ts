import { authRouter } from "./router/auth";
import { commentsRouter } from "./router/comments";
import { flashcardsRouter } from "./router/flashcards";
import { questionsRouter } from "./router/questions";
import { resourcesRouter } from "./router/resources";
import { usersRouter } from "./router/users";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "hewwo world"),
  users: usersRouter,
  auth: authRouter,
  questions: questionsRouter,
  flashcards: flashcardsRouter,
  comments: commentsRouter,
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
