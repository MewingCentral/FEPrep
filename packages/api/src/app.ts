import { Hono } from "hono";
import { handle } from "hono/vercel";

import { csrfProtection } from "./middlewares/csrf-protection";
import { validateSession } from "./middlewares/validate-session";
import { signUp } from "./routes/sign-up";

const app = new Hono()
  .basePath("/api")
  .use("*", csrfProtection)
  .use("*", validateSession)
  .route("/sign-up", signUp)
  .get("/hello", (c) => {
    return c.json({ hello: "world" });
  });

export const GET = handle(app);
export const POST = handle(app);
