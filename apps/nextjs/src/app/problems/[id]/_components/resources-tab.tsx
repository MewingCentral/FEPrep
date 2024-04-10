import type { RouterOutputs } from "@feprep/api";

import { api } from "~/trpc/server";
import { ResourcesList } from "./resources-list";

export function ResourcesTab({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const resources = api.resources.allByQuestionId(question.id);

  return (
    <div className="flex flex-col gap-4">
      <ResourcesList promise={resources} question={question} />
    </div>
  );
}
