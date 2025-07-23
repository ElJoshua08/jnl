import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import z from "zod";

export async function resendEmailController(email: string): Promise<void> {
  const { error: inputParseError } = z
    .object({
      email: z.email(),
    })
    .safeParse(email);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const authService = getInjection("IAuthService");
  await authService.resendSignupEmail(email);
}
