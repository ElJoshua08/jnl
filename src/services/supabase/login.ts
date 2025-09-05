"use server";

import { createClient } from "@/utils/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);

    return {
      error: {
        message: "Something went wrong while logging in",
        cause: error.cause,
      },
    };
  }

  return {};
}
