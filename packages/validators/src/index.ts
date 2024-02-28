import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  // TODO: make this more secure
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const PasswordResetSchema = z.object({
  token: z.string(),
  password: z.string(),
});
