"use server"

import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import {
  signupForm,
  SignupForm,
} from "@/interface-adapters/validation-schemas/auth.schema";

export async function signupController(input: SignupForm): Promise<void> {
  const { data, error: inputParseError } = signupForm.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const authService = getInjection("IAuthService");
  await authService.signup(data.email, data.password, data.email);
}
