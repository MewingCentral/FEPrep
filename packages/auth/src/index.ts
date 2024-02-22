import { Lucia } from "lucia";

import type { SelectUser } from "@feprep/db";
import { adapter } from "@feprep/db";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<SelectUser, "hashedPassword">;
  }
}

export * from "lucia";
export * from "./validate-request";
