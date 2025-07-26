import { ContainerModule } from "inversify";

import { IAuthService } from "@/application/services/auth-service.interface";
import { DI_SYMBOLS } from "@/core/types/di";
import { AuthService } from "@/infrastructure/services/auth.service";

export const AuthModule = new ContainerModule((container) => {
  if (process.env.NODE_ENV === "test") {
    // aquí podrías enlazar a un mock para testing
    // container.bind<IAuthService>(DI_SYMBOLS.IAuthService).to(MockAuthService);
  } else {
    container.bind<IAuthService>(DI_SYMBOLS.IAuthService).to(AuthService);
  }
});
