import { IUsersRepository } from "@/application/repositories/users-repository.interface";
import { NotFoundError, OperationError } from "@/entities/errors/common.error";
import { User, UserInsert } from "@/entities/models/user.entity";
import { createAdminClient } from "@/infrastructure/utils/supabase/server";

export class UsersRepository implements IUsersRepository {
  async getUsers({ limit }: { limit?: number }) {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(limit ?? 10);

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new NotFoundError("User not found");
    }

    return data.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    }));
  }

  async getUser(id: string) {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new NotFoundError("User not found");
    }

    return data as User;
  }

  async createUser(user: UserInsert) {
    const supabase = await createAdminClient();

    const { error } = await supabase.from("users").insert(user);

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }
  }
}
