import { useState } from "react";
import { useDropzone } from "@uploadthing/react";
import PDFMerger from "pdf-merger-js/browser";
import { generateClientDropzoneAccept } from "uploadthing/client";

import type { User } from "@feprep/auth";
  QUESTION_NUMBERS,
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
import { Label } from "@feprep/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@feprep/ui/select";
import { toast } from "@feprep/ui/toast";
import { CreateQuestionFormSchema } from "@feprep/validators";

import { api } from "~/trpc/react";
import { useUploadThing } from "~/utils/uploadthing";

export function CreateQuestionForm({ user }: { user: User }) {
  const [questionPDF, setQuestion] = useState<File | null>(null);
  const [solutionPDF, setSolutionPDF] = useState<File | null>(null);

  const form = useForm({
    schema: CreateQuestionFormSchema,
    defaultValues: {
      userId: user.id,
      title: "",
      semester: SEMESTERS[0],
      section: SECTIONS[0],
      topic: TOPICS[0],
      averageScore: 0,
      points: 0,
      questionNumber: "1",
    },
  });

  const { startUpload, permittedFileInfo, isUploading } =
    useUploadThing("pdfUploader");

  const utils = api.useUtils();
  const createQuestion = api.questions.create.useMutation({
    async onSuccess() {
      await utils.questions.invalidate();
      toast("Question created successfully");
    },
    onError() {
      toast("Failed to create question");
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          if (!questionPDF || !solutionPDF) {
            toast("Please upload both question and solution PDFs");
            return;
          }

          const merger = new PDFMerger();

          await merger.add(questionPDF);
          await merger.add(solutionPDF);

          const blob = await merger.saveAsBlob();
          const file = new File([blob], `${values.title ?? "Merged"}.pdf`, {
            type: "application/pdf",
          });

          const uploadPDF = await startUpload([file]);
          if (!uploadPDF?.[0]?.serverData.fileUrl) {
            console.error("Failed to start upload for question");
            return;
          }

          createQuestion.mutate({
            ...values,
            pdf: uploadPDF[0].url,
          });

          form.reset();
          setQuestion(null);
          setSolutionPDF(null);
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
                question.
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
          name="questionNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Number</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question number to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {QUESTION_NUMBERS.map((questionNumber) => (
                    <SelectItem
                      key={questionNumber}
                      value={String(questionNumber)}
                    >
                      {questionNumber}
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
        <QuestionUploader
          question={questionPDF}
          setQuestion={setQuestion}
          permittedFileInfo={permittedFileInfo}
        />
        <SolutionUploader
          solution={solutionPDF}
          setSolution={setSolutionPDF}
          permittedFileInfo={permittedFileInfo}
        />

        <Button
          className="mt-2"
          type="submit"
          disabled={isUploading || createQuestion.isPending}
        >
          {isUploading || createQuestion.isPending
            ? "Uploading..."
            : "Create Question"}
        </Button>
      </form>
    </Form>
  );
}

function QuestionUploader({
  question,
  setQuestion,
  permittedFileInfo,
}: {
  question: File | null;
  setQuestion: (file: File | null) => void;
  permittedFileInfo?: ReturnType<typeof useUploadThing>["permittedFileInfo"];
}) {
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      setQuestion(files[0] ?? null);
    },
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div>
      <Label>Question PDF</Label>
      <div
        {...getRootProps()}
        className="mb-2 mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-accent px-6 py-8 text-center"
      >
        {question ? (
          <div className="text-sm">{question.name}</div>
        ) : (
          <div className="text-sm">Drop PDF here or click here to upload</div>
        )}
        <input className="sr-only" {...getInputProps()} />
      </div>
      <p className="text-[0.8rem] text-muted-foreground">
        PDFs must be one page in length
      </p>
    </div>
  );
}

function SolutionUploader({
  solution,
  setSolution,
  permittedFileInfo,
}: {
  solution: File | null;
  setSolution: (file: File | null) => void;
  permittedFileInfo?: ReturnType<typeof useUploadThing>["permittedFileInfo"];
}) {
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      setSolution(files[0] ?? null);
    },
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div>
      <Label>Solution PDF</Label>
      <div
        {...getRootProps()}
        className="mb-2 mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-accent px-6 py-8 text-center"
      >
        {solution ? (
          <div className="text-sm">{solution.name}</div>
        ) : (
          <div className="text-sm">Drop PDF here or click here to upload</div>
        )}
        <input className="sr-only" {...getInputProps()} />
      </div>
      <p className="text-[0.8rem] text-muted-foreground">
        PDFs must be one page in length
      </p>
    </div>
  );
}
