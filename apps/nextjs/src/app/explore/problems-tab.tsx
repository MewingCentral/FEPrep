"use client";

import { api } from "~/trpc/react";
import { questionsColumns } from "./problems-columns";
import { ProblemsTable } from "./problems-table";

export function ProblemsTab() {
  const getAllQuestions = api.questions.all.useQuery();

  return (
    <ProblemsTable
      data={getAllQuestions.data ?? []}
      columns={questionsColumns}
    />
  );
}
