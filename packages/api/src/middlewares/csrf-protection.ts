import type { Next } from "hono";

import { verifyRequestOrigin } from "@feprep/auth";

import type { HonoContext } from "../config";

export async function csrfProtection(c: HonoContext, next: Next) {
  // CSRF middleware
  if (c.req.method === "GET") {
    return next();
  }
  const originHeader = c.req.header("Origin");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = c.req.header("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return c.body(null, 403);
  }

  return next();
}
