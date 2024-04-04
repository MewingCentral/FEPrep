import { z } from "zod";

import { eq, flashcardPacks, flashcards } from "@feprep/db";
import {
  FlashCardPackSchema,
  FlashCardSchema,
  UpdateCardSchema,
  UpdatePackSchema,
} from "@feprep/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const flashcardsRouter = createTRPCRouter({
  createPack: publicProcedure
    .input(FlashCardPackSchema)
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
    .input(FlashCardSchema)
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

  // readPack: publicProcedure
  //   .input(z.string())
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db
  //       .select()
  //       .from(flashcardPacks)
  //       .where(eq(flashcardPacks.userId, input));
  //   }),
  readPack: publicProcedure.input(z.string()).query(({ ctx, input} ) => {
    return ctx.db.query.flashcardPacks.findMany({
      where: eq(flashcardPacks.userId, input),
    })
  }),

  // readCards: publicProcedure
  //   .input(z.number())
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db
  //       .select()
  //       .from(flashcards)
  //       .where(eq(flashcards.packId, input));
  //   }),

  readCards: publicProcedure.input(z.number()).query(({ctx, input}) => {
    return ctx.db.query.flashcards.findMany({
      where: eq(flashcards.packId, input),
    })
  }),

  updatePack: publicProcedure
    .input(UpdatePackSchema)
    .mutation(({ ctx, input: { packId, ...pack } }) => {
      return ctx.db
        .update(flashcardPacks)
        .set(pack)
        .where(eq(flashcardPacks.id, packId));
    }),

  updateCard: publicProcedure
    .input(UpdateCardSchema)
    .mutation(({ ctx, input: { id, ...card } }) => {
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
