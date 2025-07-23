import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import {
  loginForm,
  LoginForm,
} from "@/interface-adapters/validation-schemas/auth.schema";

export async function loginController(input: LoginForm): Promise<void> {
  const { data, error: inputParseError } = loginForm.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const authService = getInjection("IAuthService");
  await authService.login(data.email, data.password);
}
