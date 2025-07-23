import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { getInjection } from "@/core/di/container";
import { AuthenticationError } from "@/entities/errors/auth.error";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    try {
      const authService = getInjection("IAuthService");
      await authService.verifyOtp(token_hash, type);
    } catch (e) {
      const error = e as AuthenticationError;

      redirect(`/auth/error?cause=${error.cause}`);
    }

    // redirect user to specified redirect URL or root of app
    redirect(next);
  }

  // redirect the user to an error page with some instructions
  redirect("/error?cause=invalid_otp_request");
}
