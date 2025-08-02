import { z } from "zod";

export const user = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  roles: z.array(z.string()).optional(),
});

export type User = z.infer<typeof user>;

export const userInsert = z.object({
  id: z.string().optional(),
  email: z.email(),
  name: z.string(),
  roles: z.array(z.string()).optional(),
});

export type UserInsert = z.infer<typeof userInsert>;
