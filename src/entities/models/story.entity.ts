import z from "zod";

export const story = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  selected_date: z.date(),
  images_urls: z.array(z.string()),
  tags: z.array(z.string()),
});

export type Story = z.infer<typeof story>;
