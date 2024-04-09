import { redirect } from "next/navigation";

import { validateRequest } from "@feprep/auth";

import { ResetPassword } from "./reset-password";

export default async function Page() {
  const { user } = await validateRequest();

  if (user) {
    redirect("/sign-in");
  }

  return <ResetPassword />;
}
