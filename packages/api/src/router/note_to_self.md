To test using vitest

import the following:

    import type { inferProcedureInput } from "@trpc/server";
    import { expect, suite, test } from "vitest";
    import type { AppRouter } from "../root";
    import { createCaller, createTRPCContext } from "../index";
    import { generateEmailVerificationCode } from "./auth";

create a testing suite:

    suite("put tests here", () =>{})

inside of the testing suite, create ctx, and caller as follows:

    const ctx = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(ctx);

then, create a test as follows 

    test("User sign-up", async () => {

       const input: inferProcedureInput<AppRouter["auth"]["signUp"]> = {
         email: "testing@gmail.com",
         password: "password12345678",
       };

       const res = await caller.auth.signUp(input);

       expect(res).toHaveProperty("session");
       expect(res).toHaveProperty("userId");

    });

