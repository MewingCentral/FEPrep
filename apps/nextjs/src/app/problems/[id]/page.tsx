import { api } from "~/trpc/server";
import { Left } from "../components/left";
import { Nav } from "../components/nav";
import { Right } from "../components/right";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await api.auth.getUser();
  const problem = await api.questions.byId(Number(params.id));

  return (
    <div className="flex h-screen flex-col">
      <Nav user={user} />
      <main className="flex flex-1 gap-2 p-4">
        <Left />
        <Right />
      </main>
    </div>
  );
}
