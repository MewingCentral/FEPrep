import type { inferProcedureInput } from "@trpc/server";
    import { expect, suite, test } from "vitest";
    import type { AppRouter } from "../root";
    import { createCaller, createTRPCContext } from "../index";

suite("Flashcards testing", () => {

    const ctx = createTRPCContext({ headers: new Headers() });
    const caller = createCaller(ctx);

    test("createPack", async () => {

       const input: inferProcedureInput<AppRouter["flashcards"]["createPack"]> = {
        name:"testing pack",
        userId:"wtroe4jemkmdjq4",
       };

       const res = await caller.flashcards.createPack(input);

       console.log(res);

       expect(res[0]).toBeDefined();
       expect(res[0]).toHaveProperty('id');
       expect(res[0]).toHaveProperty('name');
       expect(res[0]).toHaveProperty('userId');

    });

    test("createCard", async () => {

       const input: inferProcedureInput<AppRouter["flashcards"]["createCard"]> = {
        packId:1,
        front:"text front text",
        back:"text back text",
       };

       const res = await caller.flashcards.createCard(input);

       console.log(res);

       expect(res[0]).toBeDefined();
       expect(res[0]).toHaveProperty('id');
       expect(res[0]).toHaveProperty('packId');
       expect(res[0]).toHaveProperty('front');
       expect(res[0]).toHaveProperty('back');

    });
});