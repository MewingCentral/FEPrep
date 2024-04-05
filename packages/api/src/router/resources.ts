import { z } from "zod";

import { eq, resources } from "@feprep/db";
import { CreateResourceSchema, UpdateResourceSchema } from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const resourcesRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateResourceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(resources).values(input);
    }),

  allByQuestionId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.resources.findMany({
      where: eq(resources.questionId, input),
    });
  }),
  update: publicProcedure
    .input(UpdateResourceSchema)
    .mutation(async ({ ctx, input: { resourceId: id, ...resource } }) => {
      await ctx.db.update(resources).set(resource).where(eq(resources.id, id));
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(resources).where(eq(resources.id, input));
  }),
});
