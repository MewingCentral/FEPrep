"use server";

import { cookies } from "next/headers";

import { lucia, validateRequest } from "@feprep/auth";

import { api } from "~/trpc/server";

export async function signOutAction() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function getRandomQuestionId() {
  try {
    const randomQuestionId = await api.questions.randomQuestionId();
    return { randomQuestionId };
  } catch (error) {
    return {
      error: "Failed to get random question",
    };
  }
}
