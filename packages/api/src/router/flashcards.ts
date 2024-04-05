import { z } from "zod";

import { eq, flashcardPacks, flashcards } from "@feprep/db";
import {
  CreateFlashcardPackSchema,
  CreateFlashcardSchema,
  UpdateFlashcardPackSchema,
  UpdateFlashcardSchema,
} from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const flashcardsRouter = createTRPCRouter({
  createPack: publicProcedure
    .input(CreateFlashcardPackSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(flashcardPacks)
        .values({
          name: input.name,
          userId: input.userId,
        })
        .returning();
    }),

  createCard: publicProcedure
    .input(CreateFlashcardSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(flashcards)
        .values({
          packId: input.packId,
          front: input.front,
          back: input.back,
        })
        .returning();
    }),

  readPack: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.flashcardPacks.findMany({
      where: eq(flashcardPacks.userId, input),
    });
  }),

  readCards: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.flashcards.findMany({
      where: eq(flashcards.packId, input),
    });
  }),

  updatePack: publicProcedure
    .input(UpdateFlashcardPackSchema)
    .mutation(({ ctx, input: { flashcardPackId: packId, ...pack } }) => {
      return ctx.db
        .update(flashcardPacks)
        .set(pack)
        .where(eq(flashcardPacks.id, packId));
    }),

  updateCard: publicProcedure
    .input(UpdateFlashcardSchema)
    .mutation(({ ctx, input: { flashcardId: id, ...card } }) => {
      return ctx.db.update(flashcards).set(card).where(eq(flashcards.id, id));
    }),

  deletePack: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(flashcards).where(eq(flashcards.packId, input));

      return ctx.db.delete(flashcardPacks).where(eq(flashcardPacks.id, input));
    }),

  deleteCard: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(flashcards).where(eq(flashcards.id, input));
  }),
});
