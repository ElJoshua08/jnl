"use server";

import { Image } from "@/types/images";
import { createAdminClient } from "@/utils/supabase/server";

export async function getImages(options?: { limit?: number; offset?: number }) {
  const supabase = await createAdminClient();

  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 10;

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(error);

    return {
      error: {
        message: "Something went wrong while retrieving the images",
        cause: error.cause,
      },
    };
  }

  const images = data as Image[];

  return {
    data: images,
  };
}

export async function getImageById(id: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id);

  if (error) {
    return {
      error: {
        message: "Something went wrong while retrieving the image",
        cause: error.cause,
      },
    };
  }

  return {
    data,
  };
}

export async function getImagesByUserId(userId: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return {
      error: {
        message: "Something went wrong while retrieving the images",
        cause: error.cause,
      },
    };
  }

  return {
    data,
  };
}
