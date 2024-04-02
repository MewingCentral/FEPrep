import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { SignUp } from "./sign-up";

export default async function Page() {
  const session = await api.auth.getSession();

  if (session) {
    return redirect("/explore");
  }

  return <SignUp />;
}
