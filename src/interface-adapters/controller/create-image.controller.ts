"use server";

import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import { imageInsert, ImageInsert } from "@/entities/models/image.entity";

export async function createImageController(image: ImageInsert) {
  const { error: inputParseError } = imageInsert.safeParse(image);

  if (inputParseError) {
    throw new InputParseError("Algunos datos son incorrectos", {
      cause: inputParseError.cause,
    });
  }

  const storageRepository = getInjection("IImagesRepository");
  const resultImage = await storageRepository.createImage(image);

  return resultImage;
}
