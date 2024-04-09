// import { redirect } from "next/navigation";

// import { validateRequest } from "@feprep/auth";

import { Verification } from "./verification";

export default async function Page() {
  // const { session } = await validateRequest();

  // if (session) {
  //   return redirect("/explore");
  // }

  return <Verification />;
}
