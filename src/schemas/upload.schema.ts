import z from "zod";

export const uploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "No vas a subir ninguna imagen? :(")
    .max(10, "Demasiados archivos :-:"),
  date: z.date(),
  title: z
    .string("Este campo es obligatorio ._.")
    .min(2, "Hazlo un poquito mas largo :)")
    .max(100, "Demasiado largo :()"),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

export const uploadForm = uploadSchema.omit({ files: true });

export type UploadForm = z.infer<typeof uploadForm>;
