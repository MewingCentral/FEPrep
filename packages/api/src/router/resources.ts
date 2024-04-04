import { z } from "zod";

import { eq, resources } from "@feprep/db";
import { ResourceSchema, UpdateResourceSchema } from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const resourcesRouter = createTRPCRouter({
  create: publicProcedure
    .input(ResourceSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(resources)
        .values({
          questionId: input.questionId,
          link: input.link,
        })
        .returning();
    }),

  read: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.resources.findMany({
      where: eq(resources.questionId, input),
    });
  }),

  update: publicProcedure
    .input(UpdateResourceSchema)
    .mutation(async ({ ctx, input: { id, ...resource } }) => {
      return await ctx.db
        .update(resources)
        .set(resource)
        .where(eq(resources.id, id));
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(resources).where(eq(resources.id, input));
  }),
});
