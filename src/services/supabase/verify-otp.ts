"use server";

import { createClient } from "@/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";

export async function verifyOtp(token_hash: string, type: EmailOtpType) {
  if (typeof token_hash !== "string" || typeof type !== "string") {
    return {
      error: {
        message: "Invalid parameters.",
        cause: "Invalid parameters.",
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type,
  });

  if (error) {
    return {
      error: {
        message: "Something went wrong while verifying the OTP",
        cause: error.cause,
      },
    };
  }

  return {};
}
