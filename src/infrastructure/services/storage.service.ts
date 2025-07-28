import { IStorageService } from "@/application/services/storage-service.interface";
import { OperationError } from "@/entities/errors/common.error";
import { createAdminClient, createClient } from "@/infrastructure/utils/supabase/server";

export class StorageService implements IStorageService {
  async upload(file: File, path?: string) {
    const supabase = await createAdminClient();

    const filePath = path ?? `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data || !data.path) {
      throw new OperationError("Error uploading file");
    }


    return data.fullPath;
  }

  async delete(path: string) {
    const supabase = await createClient();

    const { error } = await supabase.storage.from("images").remove([path]);

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }
  }
}
