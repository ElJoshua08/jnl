import { z } from "zod";

export const imageSchema = z.object({
  name: z.string(),
  type: z.string(),
  data: z.string(),
});

export type Image = z.infer<typeof imageSchema>;

export const imageUploadInput = z.object({
  title: z.string("Este campo es obligatorio").min(3, "Al menos 3 caracteres"),
  selected_date: z.date("Este campo es obligatorio"),
  description: z
    .string()
    .min(3, "Al menos 3 caracteres")
    .max(250, "Maximo 250 caracteres"),
  tags: z.array(z.string().min(1, "Al menos 1 caracteres")),
});

export type ImageUploadInput = z.infer<typeof imageUploadInput>;

export const imageUploadSchema = imageUploadInput.extend({
  images: z.array(imageSchema),
});

export type ImageUpload = z.infer<typeof imageUploadSchema>;
