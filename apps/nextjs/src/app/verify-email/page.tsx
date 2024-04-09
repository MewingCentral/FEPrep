import { redirect } from "next/navigation";

import { validateRequest } from "@feprep/auth";

import { Verification } from "./verify-email";

export default async function Page() {
  const { session } = await validateRequest();

  if (!session) {
    return redirect("/sign-in");
  }

  return <Verification />;
}
