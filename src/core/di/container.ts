import { Container } from "inversify";

import { ImagesModule } from "@/core/di/modules/images.module";
import { StorageModule } from "@/core/di/modules/storage.module";
import { StoriesModule } from "@/core/di/modules/stories.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/core/types/di";
import { AuthModule } from "./modules/auth.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(
    AuthModule,
    StorageModule,
    StoriesModule,
    ImagesModule
  );
};

export const destroyContainer = () => {
  ApplicationContainer.unload(
    AuthModule,
    StorageModule,
    StoriesModule,
    ImagesModule
  );
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
