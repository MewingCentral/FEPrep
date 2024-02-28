import { Hono } from "hono";
import { handle } from "hono/vercel";

import type { Variables } from "./config";
import { csrfProtection } from "./middlewares/csrf-protection";
import { validateSession } from "./middlewares/validate-session";
import { forgotPassword } from "./routes/forgot-password";
import { resetPassword } from "./routes/reset-password";
import { signIn } from "./routes/sign-in";
import { signUp } from "./routes/sign-up";
import { verifyEmail } from "./routes/verify-email";

const app = new Hono<{ Variables: Variables }>()
  .basePath("/api")
  .use("*", csrfProtection)
  .use("*", validateSession)
  .route("/sign-up", signUp)
  .route("/sign-in", signIn)
  .route("/verify-email", verifyEmail)
  .route("/reset-password", resetPassword)
  .route("/forgot-password", forgotPassword)
  .get("/hello", (c) => {
    return c.json({ hello: "world" });
  });

export const GET = handle(app);
export const POST = handle(app);
