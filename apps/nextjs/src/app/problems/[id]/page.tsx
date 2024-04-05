import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { Left } from "./_components/left";
import { Nav } from "./_components/nav";
import { Right } from "./_components/right";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await api.auth.getUser();
  const question = await api.questions.byId(Number(params.id));

  if (!question) {
    return redirect("/explore");
  }

  return (
    <div className="flex h-screen flex-col">
      <Nav question={question} user={user} />
      <main className="flex flex-1 gap-2 p-4">
        <Left question={question} />
        <Right question={question} />
      </main>
    </div>
  );
}
