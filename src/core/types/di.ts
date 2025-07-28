import { IImagesRepository } from "@/application/repositories/images-repository.interface";
import { IStoriesRepository } from "@/application/repositories/stories-repository.interface";
import { IAuthService } from "@/application/services/auth-service.interface";
import { IStorageService } from "@/application/services/storage-service.interface";

export const DI_SYMBOLS = {
  IAuthService: Symbol.for("IAuthService"),
  IStorageService: Symbol.for("IStorageService"),
  IStoriesRepository: Symbol.for("IStoriesRepository"),
  IImagesRepository: Symbol.for("IImagesRepository"),
};

export interface DI_RETURN_TYPES {
  IAuthService: IAuthService;
  IStorageService: IStorageService;
  IStoriesRepository: IStoriesRepository;
  IImagesRepository: IImagesRepository;
}
