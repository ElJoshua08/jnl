"use server";

import { AuthenticationError } from "@/entities/errors/auth.error";
import { InputParseError } from "@/entities/errors/common.error";
import { loginController } from "@/interface-adapters/controller/login.controller";
import { resendEmailController } from "@/interface-adapters/controller/resend-email.controller";
import { signupController } from "@/interface-adapters/controller/signup.controller";
import {
  LoginForm,
  SignupForm,
} from "@/interface-adapters/validation-schemas/auth.schema";
import { redirect } from "next/navigation";

export async function loginAction(input: LoginForm) {
  try {
    await loginController(input);
  } catch (e) {
    if (e instanceof InputParseError) {
      return {
        error: {
          message: "Algunos de los campos no son válidos",
        },
      };
    }

    if (e instanceof AuthenticationError) {
      return {
        error: {
          message: "El usuario no existe o la contraseña es incorrecta",
        },
      };
    }

    return {
      error: {
        message: "Algo ha salido mal",
      },
    };
  }

  redirect("/");
}

export async function signupAction(input: SignupForm) {
  try {
    await signupController(input);
  } catch (e) {
    console.log(e);

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
