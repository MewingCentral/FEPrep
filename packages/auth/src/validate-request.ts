import type { Session, User } from "lucia";
import { cookies } from "next/headers";

import { lucia } from ".";

export const uncachedValidateRequest = async ({
  authorization,
}: {
  authorization: string | null;
}): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  let sessionId = null;

  // Check if authorization header is present
  if (authorization) {
    sessionId = lucia.readBearerToken(authorization);
  }
  // If session ID is not found in authorization header, check cookies
  else if (!sessionId) {
    sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  }

  // If session ID is not found, return null
  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  // Next.js throws an error when you attempt to set cookie when rendering page
  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    console.error("Failed to set session cookie");
  }

  return result;
};
