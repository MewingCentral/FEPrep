import { Suspense } from "react";

import { validateRequest } from "@feprep/auth";
import { Skeleton } from "@feprep/ui/skeleton";

import { api } from "~/trpc/server";
import { questionsColumns } from "./questions-columns";
import { QuestionsTable } from "./questions-table";

export async function QuestionsTab() {
  const questions = api.questions.all();
  const { user } = await validateRequest();

  return (
    <Suspense fallback={<Skeleton className="h-40 w-full" />}>
      <QuestionsTable
        promise={questions}
        user={user}
        columns={questionsColumns}
      />
    </Suspense>
  );
}
