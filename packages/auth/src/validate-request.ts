import type { Session, User } from "lucia";
import { cache } from "react";
import { cookies, headers } from "next/headers";

import { lucia } from ".";

export const uncachedValidateRequest = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  const headersList = headers();
  const source = headersList.get("x-trpc-source") ?? "unknown";

  if (source === "expo-react") {
    const authorization = headersList.get("Authorization");

    console.log("auth:", authorization);
    if (!authorization) {
      return { user: null, session: null };
    }

    const sessionId = lucia.readBearerToken(authorization);

    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);
    return result;
  } else {
    const cookiesList = cookies();
    const sessionId = cookiesList.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookiesList.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookiesList.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {
      console.error("Failed to set session cookie");
    }

    return result;
  }
};

export const validateRequest = cache(uncachedValidateRequest);
