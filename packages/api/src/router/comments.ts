import { z } from "zod";

import { eq, comments } from "@feprep/db";

import { commentSchema, UpdateCommentSchema } from "@feprep/validators"

import { createTRPCRouter, publicProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({

    create: publicProcedure
        .input(commentSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.insert(comments).values({
                questionId: input.questionId,
                userId: input.userId,
                content: input.content,
            })
            .returning();
        }),
    
    read: publicProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            return await ctx.db
            .select()
            .from(comments)
            .where(eq(comments.questionId, input));
        }),

    update: publicProcedure
        .input(UpdateCommentSchema)
        .mutation(async ({ctx, input: { id, ...comment}}) => {
            return await ctx.db.update(comments).set(comment).where(eq(comments.id, id));
        }),

    delete: publicProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.delete(comments).where(eq(comments.id, input));
        })

});