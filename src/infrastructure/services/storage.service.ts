import { IStorageService } from "@/application/services/storage-service.interface";
import { NotFoundError, OperationError } from "@/entities/errors/common.error";
import {
  createAdminClient,
  createClient,
} from "@/infrastructure/utils/supabase/server";

export class StorageService implements IStorageService {
  async upload(bucket: string, file: File, path?: string) {
    const supabase = await createAdminClient();

    const filePath = path ?? `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from(bucket)
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

    return data.path;
  }

  async getUrl(bucket: string, path: string): Promise<string> {
    const supabase = await createClient();

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    if (!data) {
      throw new NotFoundError(`File not found: ${path}`);
    }

    return data.publicUrl;
  }

  async delete(bucket: string, path: string) {
    const supabase = await createClient();

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }
  }
}
