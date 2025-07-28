import { ContainerModule } from "inversify";

import { IImagesRepository } from "@/application/repositories/images-repository.interface";
import { DI_SYMBOLS } from "@/core/types/di";
import { ImagesRepository } from "@/infrastructure/repositories/images.repository";

export const ImagesModule = new ContainerModule((container) => {
  if (process.env.NODE_ENV === "test") {
  } else {
    container
      .bind<IImagesRepository>(DI_SYMBOLS.IImagesRepository)
      .to(ImagesRepository);
  }
});
