import z from "zod";

export const image = z.object({
  id: z.uuid(),
  image_path: z.string(),
  width: z.number(),
  height: z.number(),
});

export type Image = z.infer<typeof image>;

export const imageInsert = z.object({
  image_path: z.string(),
  width: z.number(),
  height: z.number(),
});

export type ImageInsert = z.infer<typeof imageInsert>;
