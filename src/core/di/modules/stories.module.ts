import { ContainerModule } from "inversify";

import { IStoriesRepository } from "@/application/repositories/stories-repository.interface";
import { DI_SYMBOLS } from "@/core/types/di";
import { StoriesRepository } from "@/infrastructure/repositories/stories.repository";

export const StoriesModule = new ContainerModule((container) => {
  if (process.env.NODE_ENV === "test") {
  } else {
    container
      .bind<IStoriesRepository>(DI_SYMBOLS.IStoriesRepository)
      .to(StoriesRepository);
  }
});
