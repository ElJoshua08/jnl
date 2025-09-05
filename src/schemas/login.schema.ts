import { z } from "zod";

export const loginForm = z.object({
  email: z.email().nonoptional(),
  password: z.string().min(8).nonoptional(),
});

export type LoginForm = z.infer<typeof loginForm>;
