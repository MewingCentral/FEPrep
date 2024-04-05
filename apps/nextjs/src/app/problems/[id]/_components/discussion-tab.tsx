import type { RouterOutputs } from "@feprep/api";
import { AvatarIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Textarea } from "@feprep/ui/textarea";

import { api } from "~/trpc/server";

export async function DiscussionTab({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const comments = await api.comments.allByQuestionId(question.id);

  return (
    <div>
      <div className="mb-4">
        <Textarea className="mb-2" placeholder="Leave a comment!" />
        <Button>Submit</Button>
      </div>
      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            name={comment.user.email}
            content={comment.content}
          />
        ))}
      </div>
    </div>
  );
}

function CommentCard({ name, content }: { name: string; content: string }) {
  return (
    <div className="rounded-md border p-2">
      <div className="flex items-center p-2 font-bold">
        <AvatarIcon className="mr-2" width="25" height="25" />
        {name}
      </div>
      <p className="whitespace-normal p-2">{content}</p>
    </div>
  );
}
