import React from "react";

import type { RouterOutputs } from "@feprep/api";
import { cn } from "@feprep/ui";
import { Badge } from "@feprep/ui/badge";

import { PDF } from "./pdf";

export async function Left({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
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
    <div className="basis-1/2 rounded-lg border p-4">
      <h1 className="mb-2 flex items-center text-pretty text-3xl font-bold">
        {question.title ?? `${question.section} ${question.questionNumber}`}
      </h1>

      <div className="mb-4 flex gap-2">
        <Badge
          variant="secondary"
          className={cn({
            "text-accent": questionDifficulty === "Easy",
            "text-warning": questionDifficulty === "Medium",
            "text-danger": questionDifficulty === "Hard",
            "text-gray-500": questionDifficulty === "Unknown",
          })}
        >
          {questionDifficulty}
        </Badge>
        <Badge variant="secondary">{question.topic}</Badge>
        <Badge variant="secondary" color="primary">
          {question.points} points
        </Badge>
        <Badge variant="secondary">{question.averageScore}% Average</Badge>
      </div>
      <div className="overflow-hidden rounded-md">
        <PDF file={question.pdf} pageNumber={1} />
      </div>
    </div>
  );
}
