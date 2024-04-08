"use client";

import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import { Button } from "@feprep/ui/button";
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
import { CreateCommentSchema } from "@feprep/validators";

import { api } from "~/trpc/react";

export function CreateCommentTextarea({
  question,
  user,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
  user: User;
}) {
  const utils = api.useUtils();
  const form = useForm({
    schema: CreateCommentSchema,
    defaultValues: {
      content: "",
      questionId: question.id,
      userId: user.id,
    },
  });

  const createComment = api.comments.create.useMutation({
    onSuccess: async () => {
      await utils.comments.allByQuestionId.invalidate();
      form.reset();
      toast("Comment created!");
    },
    onError: () => {
      toast("Failed to create comment");
    },
  });

  return (
    <Form {...form}>
      <form
        className="mb-4 flex flex-col gap-2"
        onSubmit={form.handleSubmit(async (values) => {
          if (!user.emailVerified) {
            return toast("Please verify your email before commenting");
          }
          createComment.mutate(values);
        })}
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Leave a comment!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit">Submit</Button>
      </form>
    </Form>
  );
}
