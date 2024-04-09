import React from "react";

import type { RouterOutputs } from "@feprep/api";
import { validateRequest } from "@feprep/auth";
import { cn } from "@feprep/ui";
import { Badge } from "@feprep/ui/badge";

import { QuestionPDF } from "./question-pdf";
import { QuestionVoting } from "./question-voting";

export async function Left({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const { user } = await validateRequest();
  let questionDifficulty = "Unknown";

  if (
    question.easyVotes > question.mediumVotes &&
    question.easyVotes > question.hardVotes
  ) {
    questionDifficulty = "Easy";
  } else if (
    question.mediumVotes > question.easyVotes &&
    question.mediumVotes > question.hardVotes
  ) {
    questionDifficulty = "Medium";
  } else if (
    question.hardVotes > question.easyVotes &&
    question.hardVotes > question.mediumVotes
  ) {
    questionDifficulty = "Hard";
  }

  return (
    <div className="min-w-0 rounded-md border p-4 lg:basis-1/2">
      <h1 className="mb-2 flex items-center text-pretty text-3xl font-bold">
        {question.title
          ? question.title
          : `${question.section} ${question.semester}`}
      </h1>
      <div className="mb-4 flex gap-2">
        <Badge
          variant="secondary"
          className={cn("text-nowrap", {
            "bg-red-500": questionDifficulty === "easy",
          })}
        >
          {questionDifficulty}
        </Badge>
        <Badge variant="secondary" className="text-nowrap">
          {question.topic}
        </Badge>
        <Badge variant="secondary" color="primary" className="text-nowrap">
          {question.points} points
        </Badge>
        <Badge variant="secondary" className="text-nowrap">
          {question.averageScore}% Average
        </Badge>
      </div>
      <div className="mb-4 max-w-fit overflow-y-auto">
        <QuestionPDF file={question.pdf} />
      </div>
      <QuestionVoting question={question} user={user!} />
    </div>
  );
}
