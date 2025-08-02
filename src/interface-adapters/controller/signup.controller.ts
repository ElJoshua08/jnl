"use server";

import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import { AuthUser } from "@/entities/models/auth-user.entity";
import {
  signupForm,
  SignupForm,
} from "@/interface-adapters/validation-schemas/auth.schema";

export async function signupController(input: SignupForm): Promise<AuthUser> {
  const { data, error: inputParseError } = signupForm.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const authService = getInjection("IAuthService");
  const authUser = await authService.signup(
    data.email,
    data.password,
    data.name
  );

  return authUser;
}
