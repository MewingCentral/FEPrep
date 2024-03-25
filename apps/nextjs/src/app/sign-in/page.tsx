import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import SignIn from "./sign-in";

export default async function Page() {
  const session = await api.auth.getSession();

  if (session) {
    return redirect("/problems/page");
  }

  return <SignIn />;
}
