import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { verifyOtp } from "@/services/supabase/verify-otp";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const { error } = await verifyOtp(token_hash, type);

    // redirect user to specified redirect URL or root of app
    redirect(next);
  }

  // redirect the user to an error page with some instructions
  redirect("/error?cause=invalid_otp_request");
}
