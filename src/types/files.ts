import { z } from "zod";

export const file = z.object({
  publicUrl: z.string(),
  name: z.string(),
  bucket_id: z.string(),
  owner: z.string(),
  id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  last_accessed_at: z.string(),
  metadata: z.record(z.string(), z.any()),
});

export type File = z.infer<typeof file>;
