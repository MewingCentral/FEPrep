"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, Scrypt } from "@feprep/auth";
import { db } from "@feprep/db";
import { SignInSchema } from "@feprep/validators";

export async function signInAction(_: unknown, formData: FormData) {
  const object = Object.fromEntries(formData.entries());
  const parsed = SignInSchema.safeParse(object);

  if (!parsed.success) {
    const error = parsed.error.flatten();
    return {
      fieldError: {
        nid: error.fieldErrors.nid?.[0],
        password: error.fieldErrors.password?.[0],
      },
    };
  }

  const { nid, password } = parsed.data;

  const email = `${nid}@ucf.edu`;

  const user = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });

  if (!user) {
    return {
      fieldError: {
        nid: "User with this NID does not exist",
      },
    };
  }

  const validPassword = await new Scrypt().verify(
    user.hashedPassword,
    password,
  );

  if (!validPassword) {
    return {
      error: "Invalid nid or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/explore");
}
