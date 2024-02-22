import type { Context, Next } from "hono";

import { verifyRequestOrigin } from "@feprep/auth";

export async function csrfProtection(c: Context, next: Next) {
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
