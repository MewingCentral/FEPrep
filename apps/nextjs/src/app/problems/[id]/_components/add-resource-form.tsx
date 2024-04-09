"use client";

import type { RouterOutputs } from "@feprep/api";
import { Button } from "@feprep/ui/button";
import { Checkbox } from "@feprep/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@feprep/ui/form";
import { Input } from "@feprep/ui/input";
import { toast } from "@feprep/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@feprep/ui/tooltip";
import { CreateResourceSchema } from "@feprep/validators";

import { api } from "~/trpc/react";

export function AddResourceForm({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const form = useForm({
    schema: CreateResourceSchema,
    defaultValues: {
      questionId: question.id,
      link: "",
      title: "",
      isVideo: false,
    },
  });

  const utils = api.useUtils();
  const createResource = api.resources.create.useMutation({
    onSuccess: async () => {
      await utils.resources.allByQuestionId.invalidate();
      form.reset();
      toast("Resource added successfully!");
    },
    onError: () => {
      toast("Failed to add resource.");
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          createResource.mutate(values);
        })}
        className="flex w-full flex-col gap-2 py-4"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                Fill out if you&rsquo;d like to add a unique title to the
                resource.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="link"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Place your link here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="isVideo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormDescription className="flex flex-row gap-2">
                  Is this a video?{" "}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </TooltipTrigger>{" "}
                      <TooltipContent className="w-fit">
                        <div className="flex justify-center">
                          <p className="text-sm">
                            Ensure that the video is an embed link.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormDescription>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-2" type="submit">
          Add Resource
        </Button>
      </form>
    </Form>
  );
}
