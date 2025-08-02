import { IStoriesRepository } from "@/application/repositories/stories-repository.interface";
import { IUsersRepository } from "@/application/repositories/users-repository.interface";
import { IAuthService } from "@/application/services/auth-service.interface";
import { IStorageService } from "@/application/services/storage-service.interface";

export const DI_SYMBOLS = {
  IAuthService: Symbol.for("IAuthService"),
  IStorageService: Symbol.for("IStorageService"),
  IStoriesRepository: Symbol.for("IStoriesRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),
};

export interface DI_RETURN_TYPES {
  IAuthService: IAuthService;
  IStorageService: IStorageService;
  IStoriesRepository: IStoriesRepository;
  IUsersRepository: IUsersRepository;
}
