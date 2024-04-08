"use client";

import { use } from "react";

import type { RouterOutputs } from "@feprep/api";
import { AvatarIcon } from "@feprep/ui";

import { api } from "~/trpc/react";

export function CommentsList({
  promise,
  question,
}: {
  promise: Promise<RouterOutputs["comments"]["allByQuestionId"]>;
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const initialComments = use(promise);
  const comments = api.comments.allByQuestionId.useQuery(question.id, {
    initialData: initialComments,
  });

  if (comments.data.length === 0) {
    return (
      <div>Looks like there are no comments yet. Be the first to comment!</div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {comments.data.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentCard({
  comment,
}: {
  comment: RouterOutputs["comments"]["allByQuestionId"][number];
}) {
  return (
    <div className="rounded-md border p-2">
      <div className="flex items-center p-2 font-bold">
        <AvatarIcon className="mr-2" width="25" height="25" />
        {comment.user.email} ({comment.user.type})
      </div>
      <p className="whitespace-normal p-2">{comment.content}</p>
    </div>
  );
}
