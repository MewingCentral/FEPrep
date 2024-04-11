"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

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

  const questionsByTopic = api.questions.byTopic.useQuery(topic, {
    initialData: questions,
  });

  const router = useRouter();

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
        {questionsByTopic.data.map((question) => {
          let questionDifficulty = "Unrated";

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
            <TableRow
              key={question.id}
              role="link"
              className="cursor-pointer"
              onClick={() => {
                router.push(`/problems/${question.id}`);
              }}
            >
              <TableCell>{question.title}</TableCell>
              <TableCell>{question.semester}</TableCell>
              <TableCell>{question.points}</TableCell>
              <TableCell
                className={cn({
                  "text-green-500  hover:text-green-500":
                    questionDifficulty === "Easy",
                  " text-yellow-500 hover:text-yellow-500":
                    questionDifficulty === "Medium",
                  "text-red-500  hover:text-red-500":
                    questionDifficulty === "Hard",
                  "text-foreground": questionDifficulty === "Unrated",
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
