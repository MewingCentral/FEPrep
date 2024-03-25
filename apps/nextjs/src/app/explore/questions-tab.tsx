"use client";

import { Skeleton } from "@feprep/ui/skeleton";

import { api } from "~/trpc/react";
import { questionsColumns } from "./questions-columns";
import { QuestionsTable } from "./questions-table";

export function QuestionsTab() {
  const getAllQuestions = api.questions.all.useQuery();

  // TODO: make this a lot nicer
  if (getAllQuestions.isLoading) {
    return <Skeleton className="h-40 w-full" />;
  }

  return (
    <QuestionsTable
      data={getAllQuestions.data ?? []}
      columns={questionsColumns}
    />
  );
}
