import React from "react";

import type { RouterOutputs } from "@feprep/api";
import { validateRequest } from "@feprep/auth";
import { cn, Pencil2Icon } from "@feprep/ui";
import { Badge } from "@feprep/ui/badge";
import { Button } from "@feprep/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@feprep/ui/sheet";

import { QuestionPDF } from "./question-pdf";
import { QuestionVoting } from "./question-voting";
import { UpdateQuestionForm } from "./update-question-form";

export async function Left({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const { user } = await validateRequest();
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
    <div>
      <h1 className="mb-2 flex items-center text-pretty text-3xl font-bold">
        {question.title}
      </h1>
      <div className="mb-4 flex gap-2">
        <Badge
          variant="secondary"
          className={cn("text-nowrap", {
            "bg-green-500 text-white hover:bg-green-500":
              questionDifficulty === "Easy",
            "bg-yellow-500 text-white hover:bg-yellow-500":
              questionDifficulty === "Medium",
            "bg-red-500 text-white hover:bg-red-500":
              questionDifficulty === "Hard",
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
      <div className="mb-4 max-w-fit">
        <QuestionPDF file={question.pdf} />
      </div>
      <QuestionVoting question={question} user={user!} />
      {user?.type === "Teacher" && (
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Pencil2Icon className="mr-2 h-4 w-4" />
              <span>Update Queston</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Update Question</SheetTitle>
              <SheetDescription>
                Update the question details and upload a new PDF file.
              </SheetDescription>
              <UpdateQuestionForm question={question} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
