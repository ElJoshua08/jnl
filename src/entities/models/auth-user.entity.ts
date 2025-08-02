import { z } from "zod";

export const authUser = z.object({
  id: z.uuid(),
  email: z.string(),
  user_metadata: z.object({
    name: z.string(),
    role: z.string(),
  }),
});

export type AuthUser = z.infer<typeof authUser>;

