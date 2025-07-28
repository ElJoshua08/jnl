import { ContainerModule } from "inversify";

import { IStorageService } from "@/application/services/storage-service.interface";
import { DI_SYMBOLS } from "@/core/types/di";
import { StorageService } from "@/infrastructure/services/storage.service";

export const StorageModule = new ContainerModule((container) => {
  if (process.env.NODE_ENV === "test") {
  } else {
    container.bind<IStorageService>(DI_SYMBOLS.IStorageService).to(StorageService);
  }
});
