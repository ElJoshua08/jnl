"use server";

import { getInjection } from "@/core/di/container";

export async function getUrlController(
  bucket: string,
  path: string
): Promise<string> {
  const storageService = getInjection("IStorageService");

  try {
    return await storageService.getUrl(bucket, path);
  } catch (error) {
    throw error;
  }
}
