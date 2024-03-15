"use client";

import { api } from "~/trpc/react";
import { questionsColumns } from "./questions-columns";
import { QuestionsTable } from "./questions-table";

export function QuestionsTab() {
  const getAllQuestions = api.questions.all.useQuery();

  return (
    <QuestionsTable
      data={getAllQuestions.data ?? []}
      columns={questionsColumns}
    />
  );
}
