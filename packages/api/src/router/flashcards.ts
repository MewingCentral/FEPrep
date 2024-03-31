// import { TRPCError } from "@trpc/server";

import { and, eq, flashcardPacks, flashcards } from "@feprep/db";
import { FlashCardPackSchema, FlashCardSchema } from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const flashcardsRouter = createTRPCRouter({
  createPack: publicProcedure
    .input(FlashCardPackSchema)
    .mutation(async ({ ctx, input }) => {
      const pack = await ctx.db.insert(flashcardPacks).values({
        name: input.name,
        userId: input.userId,
      }).returning();

      return pack;

    }),

  createCard: publicProcedure
    .input(FlashCardSchema)
    .mutation(async ({ ctx, input }) => {
      const card = await ctx.db.insert(flashcards).values({
        packId: input.packId,
        front: input.front,
        back: input.back,
      }).returning();

      return card;

    }),
});
