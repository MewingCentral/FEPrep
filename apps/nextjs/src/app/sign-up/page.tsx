import { redirect } from "next/navigation";

import { validateRequest } from "@feprep/auth";

import { SignUp } from "./sign-up";

export default async function Page() {
  const { session } = await validateRequest();

  if (session) {
    return redirect("/explore");
  }

  return <SignUp />;
}
