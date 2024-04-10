import { redirect } from "next/navigation";

import { ScrollArea, ScrollBar } from "@feprep/ui/scroll-area";

import { api } from "~/trpc/server";
import { Left } from "./_components/left";
import { Nav } from "./_components/nav";
import { QuestionProvider } from "./_components/question-context";
import { Right } from "./_components/right";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await api.auth.getUser();
  const question = await api.questions.byId(Number(params.id));

  if (!question) {
    return redirect("/explore");
  }

  return (
    <QuestionProvider>
      <div className="flex h-screen flex-col">
        <Nav question={question} user={user} />
        <main className="flex flex-1 flex-col gap-2 p-4 lg:min-h-0 lg:flex-row">
          <ScrollArea className="rounded-md border p-8 lg:basis-1/2">
            <Left question={question} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <ScrollArea className="rounded-md border p-8 lg:basis-1/2">
            <Right question={question} user={user} />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </main>
      </div>
    </QuestionProvider>
  );
}
