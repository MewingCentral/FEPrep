import { cache } from "react";
import { headers } from "next/headers";

import { createCaller, createTRPCContext } from "@feprep/api";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createTRPCServerContext = cache(async () => {
  const requestHeaders = new Headers(headers());
  requestHeaders.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: requestHeaders,
  });
});

export const api = createCaller(createTRPCServerContext);
