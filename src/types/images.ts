import { z } from "zod";

export const image = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  title: z.string(),
  path: z.string(),
  width: z.number(),
  height: z.number(),
  created_at: z.date(),
});

export type Image = z.infer<typeof image>;

export const imageInsert = image.omit({
  id: true,
  created_at: true,
});

export type ImageInsert = z.infer<typeof imageInsert>;

export const imageUpdate = image
  .omit({
    id: true,
  })
  .partial();

export type ImageUpdate = z.infer<typeof imageUpdate>;
