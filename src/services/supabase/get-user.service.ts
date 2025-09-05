"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    if (error.code === "user_not_found") {
      return {
        data: undefined,
      };
    }

    return {
      error: {
        message: "Something went wrong while retrieving the user",
        cause: error.cause,
      },
    };
  }

  return {
    data: data.user,
  };
}
