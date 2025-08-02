import { ContainerModule } from "inversify";

import { IUsersRepository } from "@/application/repositories/users-repository.interface";
import { DI_SYMBOLS } from "@/core/types/di";
import { UsersRepository } from "@/infrastructure/repositories/users.repository";

export const UsersModule = new ContainerModule((container) => {
  if (process.env.NODE_ENV === "test") {
  } else {
    container
      .bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository)
      .to(UsersRepository);
  }
});
