import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  // TODO: make this more secure
  password: z.string().min(8),
});
