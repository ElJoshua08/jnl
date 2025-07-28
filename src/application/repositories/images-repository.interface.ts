import { Image, ImageInsert } from "@/entities/models/image.entity";

export interface IImagesRepository {
  getImages(options?: { limit?: number }): Promise<Image[] | null>;
  getImage(id: string): Promise<Image>;
  createImage(image: ImageInsert): Promise<Image>;
}
