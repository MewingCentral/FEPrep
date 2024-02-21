import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import type { HonoConfig } from "./config";
import { appRouter, createTRPCContext } from ".";
import { csrfProtection } from "./middlewares/csrf-protection";
import { validateSession } from "./middlewares/validate-session";

const app = new Hono<HonoConfig>()
  .basePath("/api")
  .use("*", csrfProtection)
  .use("*", validateSession)
  .get("/hello", (c) => {
    return c.json({ hello: "world" });
  });

export const GET = handle(app);
export const POST = handle(app);
