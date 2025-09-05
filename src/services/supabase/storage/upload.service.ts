"use server";

import { createAdminClient } from "@/utils/supabase/server";

export async function uploadFiles(
  files: File[],
  bucket: string,
  options?: { addTimestamp?: boolean }
) {
  const supabase = await createAdminClient();

  const now = new Date();
  const timestamp = now.toISOString();

  await Promise.all(
    files.map(async (file) => {
      const fileName = options?.addTimestamp
        ? `${now.getTime()}-${file.name}`
        : file.name;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) {
        console.error(error);
      }
    })
  );

  console.log("Files uploaded at:", timestamp);

  return { uploadedAt: timestamp };
}
