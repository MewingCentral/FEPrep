import { redirect } from "next/navigation";

import { validateRequest } from "@feprep/auth";

import { SignIn } from "./sign-in";

export default async function Page() {
  const { session } = await validateRequest();

  if (session) {
    return redirect("/explore");
  }

  return <SignIn />;
}
