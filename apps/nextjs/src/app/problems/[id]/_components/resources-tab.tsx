import type { RouterOutputs } from "@feprep/api";
import { validateRequest } from "@feprep/auth";
import { PlusIcon } from "@feprep/ui";
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
import { AddResourceForm } from "./add-resource-form";
import { ResourcesList } from "./resources-list";

export async function ResourcesTab({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const { user } = await validateRequest();
  const resources = api.resources.allByQuestionId(question.id);

  return (
    <div className="flex flex-col gap-4">
      <ResourcesList promise={resources} question={question} />
      {user && <AddResourceButton question={question} />}
    </div>
  );
}

function AddResourceButton({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="absolute right-8 top-[34px]">
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Resource</SheetTitle>
          <SheetDescription>
            Add a link to a resource for this question.
          </SheetDescription>
        </SheetHeader>
        <AddResourceForm question={question} />
      </SheetContent>
    </Sheet>
  );
}
