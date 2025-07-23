import { IAuthService } from "@/application/services/auth-service.interface";

export const DI_SYMBOLS = {
  IAuthService: Symbol.for("IAuthService"),
};

export interface DI_RETURN_TYPES {
  IAuthService: IAuthService;
}
