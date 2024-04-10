"use client";

import { use } from "react";

import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import { AvatarIcon, Pencil1Icon, TrashIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@feprep/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@feprep/ui/form";
import { Textarea } from "@feprep/ui/textarea";
import { toast } from "@feprep/ui/toast";
import { UpdateCommentSchema } from "@feprep/validators";

import { api } from "~/trpc/react";

export function CommentsList({
  user,
  promise,
  question,
}: {
  user: User | null;
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
        <CommentCard
          key={comment.id}
          comment={comment}
          user={user}
          question={question}
        />
      ))}
    </div>
  );
}

function CommentCard({
  user,
  comment,
  question,
}: {
  user: User | null;
  comment: RouterOutputs["comments"]["allByQuestionId"][number];
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const utils = api.useUtils();
  const delComment = api.comments.delete.useMutation({
    onSuccess: async () => {
      await utils.comments.allByQuestionId.invalidate();
      toast("Seuccessfully Deleted");
    },
    onError: () => {
      toast("failed to delete");
    },
  });
  const updateForm = useForm({
    schema: UpdateCommentSchema,
    defaultValues: {
      userId: user!.id,
      content: comment.content,
      commentId: comment.id,
      questionId: question.id,
    },
  });
  const updateComment = api.comments.update.useMutation({
    onSuccess: async () => {
      await utils.comments.allByQuestionId.invalidate();
      toast("Comment Edited!");
    },
    onError: () => {
      toast("Failed to edit");
    },
  });
  return (
    <div className="rounded-md border p-2" id={comment.id.toString()}>
      <div className="flex items-center p-2 font-bold">
        <AvatarIcon className="mr-2" width="25" height="25" />
        {comment.user.email} ({comment.user.type})
      </div>
      <p className="flex flex-1 flex-col gap-5 whitespace-normal p-2 lg:flex-row">
        <div className="w-8 flex-1">{comment.content}</div>
        {user?.id === comment.userId && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="right-0" variant="secondary" size="icon">
                <Pencil1Icon width="15" height="15" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              <DialogHeader>
                <DialogTitle>Edit Comment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex grid-cols-6 items-center gap-4">
                  <Form {...updateForm}>
                    <form
                      className="w-full"
                      onSubmit={updateForm.handleSubmit(async (values) => {
                        updateComment.mutate(values);
                        toast("yahoo");
                      })}
                    >
                      <FormField
                        name="content"
                        control={updateForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                className="col-span-6"
                                placeholder={comment.content}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button className="mt-3" type="submit">
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {user?.id === comment.userId && (
          <div>
            <Button
              onClick={() => {
                delComment.mutate(comment.id);
              }}
              className="right-0"
              variant="destructive"
              size="icon"
            >
              <TrashIcon width="15" height="15" />
            </Button>
          </div>
        )}
      </p>
    </div>
  );
}
