"use client";

import { use } from "react";

import type { RouterOutputs } from "@feprep/api";
import type { TOPICS } from "@feprep/consts";
import { cn } from "@feprep/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@feprep/ui/table";

import { api } from "~/trpc/react";

export function QuestionsTable({
  topic,
  promise,
}: {
  topic: (typeof TOPICS)[number];
  promise: Promise<RouterOutputs["questions"]["byTopic"]>;
}) {
  const questions = use(promise);

  const allQuestions = api.questions.byTopic.useQuery(topic, {
    initialData: questions,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>Difficulty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allQuestions.data.map((question) => {
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
            <TableRow key={question.id}>
              <TableCell>{question.title}</TableCell>
              <TableCell>{question.semester}</TableCell>
              <TableCell>{question.points}</TableCell>
              <TableCell
                className={cn({
                  "text-accent": questionDifficulty === "Easy",
                  "text-primary": questionDifficulty === "Medium",
                  "text-error": questionDifficulty === "Hard",
                  "text-gray-500": questionDifficulty === "Unknown",
                })}
              >
                {questionDifficulty}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
