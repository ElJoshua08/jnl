"use server";

import { getInjection } from "@/core/di/container";

export async function uploadImage(image: File) {
  const storageService = getInjection("IStorageService");
  const imagePath = await storageService.upload("images", image);

  return imagePath;
}
