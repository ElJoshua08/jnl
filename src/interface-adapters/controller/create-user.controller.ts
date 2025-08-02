"use server";

import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import {
  signupForm,
  SignupForm,
} from "@/interface-adapters/validation-schemas/auth.schema";

export async function createUserController(input: SignupForm, id?: string) {
  const { data, error: validationError } = signupForm.safeParse(input);

  if (validationError) {
    throw new InputParseError(validationError.message);
  }

  const userRepository = getInjection("IUsersRepository");
  await userRepository.createUser({
    id: id,
    email: data.email,
    name: data.name,
    roles: [],
  });
}
