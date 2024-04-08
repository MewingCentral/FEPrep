import type { RouterOutputs } from "@feprep/api";
import { Button } from "@feprep/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@feprep/ui/sheet";

import { api } from "~/trpc/server";
import { QuestionsTable } from "./questions-table";

export async function QuestionsSheet({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const promise = api.questions.byTopic(question.topic);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="rounded-r-none border-r-0 focus-visible:bg-accent focus-visible:ring-0"
        >
          Questions
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="min-w-[40vw]">
        <SheetHeader className="mb-4">
          <SheetTitle>{question.topic}</SheetTitle>
          <SheetDescription>
            Questions for the topic of {question.topic}
          </SheetDescription>
        </SheetHeader>
        <QuestionsTable topic={question.topic} promise={promise} />
      </SheetContent>
    </Sheet>
  );
}
