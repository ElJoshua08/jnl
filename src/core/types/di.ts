import { IStoriesRepository } from "@/application/repositories/stories-repository.interface";
import { IAuthService } from "@/application/services/auth-service.interface";

export const DI_SYMBOLS = {
  IAuthService: Symbol.for("IAuthService"),
  IStoriesRepository: Symbol.for("IStoriesRepository"),
};

export interface DI_RETURN_TYPES {
  IAuthService: IAuthService;
  IStoriesRepository: IStoriesRepository;
}
