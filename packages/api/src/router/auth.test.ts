//import type { inferProcedureInput } from "@trpc/server";
import { expect, suite, test } from "vitest";
// import type { AppRouter } from "../root";
// import { createCaller, createTRPCContext } from "../index";

import { generateEmailVerificationCode } from "./auth";

suite("Authentication Routes", () => {

  // const ctx = await createTRPCContext({ headers: new Headers() });
  // const caller = createCaller(ctx);

  // test("User sign-up", async () => {

  //   const input: inferProcedureInput<AppRouter["auth"]["signUp"]> = {
  //     email: "testing@gmail.com",
  //     password: "password12345678",
  //   };

  //   const res = await caller.auth.signUp(input);

  //   expect(res).toHaveProperty("session");
  //   expect(res).toHaveProperty("userId");

  // });

  // test("Generate Email Verification code", async () => {

  //   const input = {
  //     userID: "123134829",
  //     email: "testing@gmail.com"
  //   };

  //   const res = await generateEmailVerificationCode(input.userID, input.email);

  //   expect(res).toBeDefined();
  //   expect(res).match(/[0-9]{8}/);

  // });

  test("testing"), () => {
    expect(Math.sqrt(4)).toBe(2);
  }

});
