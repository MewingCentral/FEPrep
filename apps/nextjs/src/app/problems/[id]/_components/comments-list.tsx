"use client";

import { use } from "react";
import { toast } from "@feprep/ui/toast";

import type { RouterOutputs } from "@feprep/api";
import { AvatarIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";

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
      <div className="text-muted-foreground">
        Looks like there are no comments yet. Be the first to comment!
      </div>
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
  const utils = api.useUtils();
  const delComment = api.comments.delete.useMutation({
    onSuccess: async () => {
      await utils.comments.allByQuestionId.invalidate();
      toast("deleted");
    },
    onError: () => {
      toast("failed to delete");
    },
  });
  // function handleDelete(id) {
  // }
  return (
    <div className="rounded-md border p-2" id={comment.id.toString()}>
      <div className="flex items-center p-2 font-bold">
        <AvatarIcon className="mr-2" width="25" height="25" />
        {comment.user.email} ({comment.user.type})
      </div>
      <p className="whitespace-normal p-2 flex flex-1 flex-col gap-5 lg:flex-row">
        {comment.content}
        <div {...delComment}>
          <Button variant='destructive' onClick={async () => {
            delComment.mutate(comment.id);
            
            
            // const elem = document.getElementById(comment.id.toString());
            // elem?.remove();
          }
        }>bye</Button> 
        
        </div>

      </p>
    </div>
  );
}
