import { commentsRouter } from "./router/comments";
import { flashcardsRouter } from "./router/flashcards";
import { resourcesRouter } from "./router/resources";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "hewwo world"),
  flashcards: flashcardsRouter,
  comments: commentsRouter,
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
