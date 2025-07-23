import { z } from "zod";

export const loginForm = z.object({
  email: z.email("El correo utilizado no es válido"),
  password: z
    .string("La contraseña debe ser un texto")
    .min(8, "La contraseña deben tener al menos 8 caracteres"),
});

export type LoginForm = z.infer<typeof loginForm>;

export const signupForm = z
  .object({
    name: z
      .string("Este campo es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.email("El correo utilizado no es válido"),
    password: z
      .string("La contraseña debe ser un texto")
      .min(8, "La contraseña deben tener al menos 8 caracteres"),
    confirmPassword: z
      .string("La contraseña debe ser un texto")
      .min(8, "La contraseña deben tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
  });

export type SignupForm = z.infer<typeof signupForm>;
