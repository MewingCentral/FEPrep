// import { TRPCError } from "@trpc/server";

import { and, eq, flashcardPacks, flashcards } from "@feprep/db";
import { FlashCardPackSchema, FlashCardSchema } from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const flashcardsRouter = createTRPCRouter({
  createPack: publicProcedure
    .input(FlashCardPackSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(flashcardPacks).values({
        name: input.name,
        userId: input.userId,
      });

      const results = await ctx.db
        .select({ id: flashcardPacks.id })
        .from(flashcardPacks)
        .where(eq(flashcardPacks.name, input.name));

      const id = results[0];

      return { newPackId: id };
    }),

  createCard: publicProcedure
    .input(FlashCardSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(flashcards).values({
        packId: input.packId,
        front: input.front,
        back: input.back,
      });

      const results = await ctx.db
        .select({ id: flashcards.id })
        .from(flashcards)
        .where(
          and(
            eq(flashcards.front, input.front),
            eq(flashcards.packId, input.packId),
            eq(flashcards.back, input.back),
          ),
        );

      const id = results[0];

      return { newCardId: id };
    }),
});
