import { api } from "~/trpc/server";
import { Dashboard } from "./dashboard";

export default async function Page() {
  const user = await api.auth.getUser();

  // return <Dashboard user={user} />;
  return <Dashboard />;
}
