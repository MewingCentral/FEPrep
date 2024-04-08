import { z } from "zod";

import { SECTIONS, SEMESTERS, TOPICS } from "@feprep/consts";

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  // TODO: make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignUpFormSchema = z.object({
  nid: z.string().regex(/[a-z]{2}[0-9]{6}/, "Please enter a valid NID"),
  // TODO: also make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormInput = z.infer<typeof SignUpFormSchema>;

export const SignInSchema = z.object({
  nid: z.string().regex(/[a-z]{2}[0-9]{6}/, "Please enter a valid NID"),
  password: z.string().min(1, "Please enter a password"),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const VerifyEmailSchema = z.object({
  code: z.string(),
});

export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;

export const CreateQuestionSchema = z.object({
  userId: z.string(),
  title: z.string().optional(),
  pdf: z.string(),
  averageScore: z.number(),
  easyVotes: z.number().optional(),
  mediumVotes: z.number().optional(),
  hardVotes: z.number().optional(),
  points: z.number(),
  semester: z.enum(SEMESTERS),
  topic: z.enum(TOPICS),
  section: z.enum(SECTIONS),
  questionNumber: z.number(),
});

export const CreateQuestionFormSchema = CreateQuestionSchema.omit({
  pdf: true,
});

export const UpdateQuestionSchema = CreateQuestionSchema.extend({
  questionId: z.number(),
});

export const UpdateQuestionFormSchema = UpdateQuestionSchema.extend({
  questionId: z.number(),
}).omit({
  pdf: true,
});

export const CreateFlashcardPackSchema = z.object({
  name: z.string(),
  userId: z.string(),
});

export type CreateFlashcardPackInput = z.infer<
  typeof CreateFlashcardPackSchema
>;

export const CreateFlashcardSchema = z.object({
  packId: z.number(),
  front: z.string(),
  back: z.string(),
});

export type FlashcardInputType = z.infer<typeof CreateFlashcardSchema>;

export const UpdateFlashcardPackSchema = CreateFlashcardPackSchema.extend({
  flashcardPackId: z.number(),
});

export type UpdateFlashcardPackInput = z.infer<
  typeof UpdateFlashcardPackSchema
>;

export const UpdateFlashcardSchema = CreateFlashcardSchema.extend({
  flashcardId: z.number(),
});

export type UpdateFlashcardInput = z.infer<typeof UpdateFlashcardSchema>;

export const CreateCommentSchema = z.object({
  questionId: z.number(),
  userId: z.string(),
  content: z.string().min(1, "Please enter a comment"),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;

export const UpdateCommentSchema = CreateCommentSchema.extend({
  commentId: z.number(),
});

export type UpdateCommentInput = z.infer<typeof UpdateCommentSchema>;

export const CreateResourceSchema = z.object({
  questionId: z.number(),
  link: z.string(),
  title: z.string(),
  isVideo: z.boolean(),
});

export type CreateResourceInput = z.infer<typeof CreateResourceSchema>;

export const UpdateResourceSchema = CreateResourceSchema.extend({
  resourceId: z.number(),
});
