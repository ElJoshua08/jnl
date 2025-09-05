"use server";

import { loginForm, LoginForm } from "@/schemas/login.schema";
import { login } from "@/services/supabase/login";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(input: LoginForm) {
  const { data } = loginForm.safeParse(input);

  if (!data || !data.email || !data.password) {
    return {
      error: {
        message: "Missing data",
      },
    };
  }

  const { error } = await login({
    email: data?.email,
    password: data?.password,
  });

  if (error) {
    return {
      error,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signupAction(input: SignupForm) {
  try {
    const { id } = await signupController(input);
    await createUserController(input, id);
  } catch (e) {
    if (e instanceof InputParseError) {
      return {
        success: false,
        error: { message: "Algunos de los campos no son válidos" },
      };
    }

    if (e instanceof AuthenticationError) {
      return {
        success: false,
        error: { message: "El usuario ya existe" },
      };
    }

    console.error(e);
    return {
      success: false,
      error: {
        message: "Algo ha salido mal",
      },
    };
  }

  return {
    success: true,
  };
}

export async function resendSignupEmailAction(email: string) {
  try {
    await resendEmailController(email);
  } catch (e) {
    if (e instanceof InputParseError) {
      return {
        success: false,
        error: {
          message: "Algunos de los campos no son válidos",
        },
      };
    }

    if (e instanceof AuthenticationError) {
      return {
        success: false,
        error: {
          message: "El usuario ya existe",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Algo ha salido mal",
      },
    };
  }

  return {
    success: true,
  };
}
