import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  // TODO: make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignUpFormSchema = z.object({
  nid: z.string().regex(/[a-z]{2}[0-9]{6}/, "Invalid NID"),
  // TODO: also make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormInput = z.infer<typeof SignUpFormSchema>;

export const SignUpFormSchema = z.object({
  nid: z.string().regex(/[a-z]{2}[0-9]{6}/, "Invalid NID"),
  // TODO: also make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormInput = z.infer<typeof SignUpFormSchema>;

export const SignUpFormSchema = z.object({
  nid: z.string().regex(/[a-z]{2}[0-9]{6}/, "Invalid NID"),
  // TODO: also make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormInput = z.infer<typeof SignUpFormSchema>;

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
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
