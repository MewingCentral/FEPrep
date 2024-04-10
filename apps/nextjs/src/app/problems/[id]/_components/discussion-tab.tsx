import { Suspense } from "react";

import type { RouterOutputs } from "@feprep/api";
import { validateRequest } from "@feprep/auth";

import { api } from "~/trpc/server";
import { CommentsList } from "./comments-list";
import { CreateCommentTextarea } from "./create-comment-textarea";

export async function DiscussionTab({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const { user } = await validateRequest();
  const comments = api.comments.allByQuestionId(question.id);

  return (
    <div>
      {user && <CreateCommentTextarea question={question} user={user} />}
      <Suspense fallback={<div>Loading comments...</div>}>
        <CommentsList promise={comments} question={question} user={user} />
      </Suspense>
    </div>
  );
}
