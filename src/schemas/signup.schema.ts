import { z } from "zod";

export const signUpForm = z
  .object({
    email: z.string().email().nonoptional(),
    password: z.string().min(8).nonoptional(),
    confirmPassword: z.string().min(8).nonoptional(),
    name: z.string().min(2).nonoptional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpForm = z.infer<typeof signUpForm>;
