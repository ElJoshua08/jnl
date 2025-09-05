"use server";

import { uploadSchema, UploadSchema } from "@/schemas/upload.schema";
import { getUser } from "@/services/supabase/get-user.service";
import { insertImages } from "@/services/supabase/images/insert.service";
import { uploadFiles } from "@/services/supabase/storage/upload.service";
import { getImageSize } from "@/utils/images/getImageSize";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function insertImagesAction(input: UploadSchema) {
  /**
   * All this might be able to be done with zsa
   */

  const { success, data } = uploadSchema.safeParse(input);

  if (!success) {
    return {
      error: {
        message: "Algunos de los campos no son válidos",
        cause: "Invalid parameters.",
      },
    };
  }

  /**
   * Action Starts here.
   */
  const { data: user, error: authError } = await getUser();

  if (authError) {
    return {
      error: {
        message: "No tienes permisos para hacer esto",
        cause: authError.cause,
      },
    };
  }

  if (!user) {
    return {
      error: {
        message: "Inicia sesión para poder subir archivos",
        cause: "No user found",
      },
    };
  }

  await uploadFiles(data.files, "images", {
    addTimestamp: true,
  });

  console.log("Files uploaded :)");

  const imagesToInsert = await Promise.all(
    data.files.map(async (file) => {
      const { width, height } = await getImageSize(file);

      console.log(
        `File - ${file.name} processed, width: ${width}, height: ${height}`
      );

      return {
        user_id: user.id,
        title: data.title,
        path: file.name,
        width,
        height,
      };
    })
  );

  const { error } = await insertImages(imagesToInsert);

  if (error) {
    return {
      error: {
        message: "Algo ha salido mal",
        cause: error.cause,
      },
    };
  }

  revalidatePath("/", "page");
  revalidatePath("/gallery", "layout");
  redirect("/");
}
