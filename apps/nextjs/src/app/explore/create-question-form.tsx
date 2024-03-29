import { useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { SECTIONS, SEMESTERS, TOPICS } from "@feprep/consts";
import { Button } from "@feprep/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@feprep/ui/select";
import { CreateQuestionFormSchema } from "@feprep/validators";

import { api } from "~/trpc/react";
import { useUploadThing } from "~/utils/uploadthing";

export function CreateQuestionForm() {
  const [files, setFiles] = useState<File[] | null>(null);

  const form = useForm({
    schema: CreateQuestionFormSchema,
    defaultValues: {
      // TODO: Change this to the user id of the current user
      userId: "1",
      title: "",
      semester: SEMESTERS[0],
      section: SECTIONS[0],
      topic: TOPICS[0],
      averageScore: 0,
      points: 0,
      questionNumber: 1,
    },
  });

  const createQuestion = api.questions.create.useMutation({
    onSuccess(values) {
      console.log(values);
    },
    onError(error) {
      console.error(error);
    },
  });

  const { isUploading, startUpload, permittedFileInfo } = useUploadThing(
    "pdfUploader",
    {
      onClientUploadComplete: (data) => {
        console.log(data);
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      setFiles(files);
    },
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          console.log(values);
          console.log(files);
          if (!files?.length) return;
          // createQuestion.mutate(values);
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
                question
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="semester"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEMESTERS.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="topic"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TOPICS.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="section"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SECTIONS.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="averageScore"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Score</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="points"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          {...getRootProps()}
          className="mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center"
        >
          {files?.length > 0 ? <div>{files[0]?.name}</div> : null}
          <input className="sr-only" {...getInputProps()} />
        </div>
        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
