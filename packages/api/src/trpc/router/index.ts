import { createTRPCRouter, publicProcedure } from "..";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "Hello, World!"),
});

// export type definition of API
export type AppRouter = typeof appRouter;
