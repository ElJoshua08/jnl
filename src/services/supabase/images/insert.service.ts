import { ImageInsert } from "@/types/images";
import { createAdminClient } from "@/utils/supabase/server";

export async function insertImages(data: ImageInsert | ImageInsert[]) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("images").insert(data);

  if (error) {
    console.error(error);

    return {
      error: {
        message: "Something went wrong while inserting the image",
        cause: error.cause,
      },
    };
  }

  return {};
}
