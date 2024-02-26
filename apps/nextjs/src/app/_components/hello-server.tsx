import { api } from "~/trpc/server";

export async function HelloServer() {
  const data = await api.hello();
  return <div className="text-red-300">{data}</div>;
}
