"use server";

import { createAdminClient } from "@/utils/supabase/server";

export async function getFile(path: string, bucket: string) {
  const supabase = await createAdminClient();

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return {
    data: {
      url: data.publicUrl,
    },
  };
}

export async function getFiles(
  bucket: string,
  options?: {
    limit?: number;
    offset?: number;
  }
) {
  const supabase = await createAdminClient();

  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 10;

  const { data, error } = await supabase.storage.from(bucket).list("", {
    offset,
    limit,
    sortBy: {
      column: "created_at",
      order: "desc",
    },
  });

  if (error) {
    console.error(error);
    return {};
  }

  const filesWithUrls = data.map((file) => {
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(file.name);

    return {
      ...file,
      publicUrl: publicUrlData.publicUrl,
    };
  });

  return { data: filesWithUrls };
}
