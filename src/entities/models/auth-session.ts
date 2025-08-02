import { z } from "zod";

export const authSession = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export type AuthSession = z.infer<typeof authSession>;
