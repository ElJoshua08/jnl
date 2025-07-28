import { IImagesRepository } from "@/application/repositories/images-repository.interface";
import { NotFoundError, OperationError } from "@/entities/errors/common.error";
import { Image, ImageInsert } from "@/entities/models/image.entity";
import {
  createAdminClient,
  createClient,
} from "@/infrastructure/utils/supabase/server";

export class ImagesRepository implements IImagesRepository {
  async getImages(options?: { limit?: number }) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("images")
      .select("*")
      .limit(options?.limit || 20);

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (data.length === 0) {
      return null;
    }

    return data;
  }

  async getImage(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new NotFoundError("Image not found");
    }

    return data;
  }

  async createImage(image: ImageInsert) {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("images")
      .insert(image)
      .select("*")
      .single();

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new OperationError("Error creating image");
    }

    return data as Image;
  }
}
