import { User, UserInsert } from "@/entities/models/user.entity";

export interface IUsersRepository {
  getUsers(options: { limit: number }): Promise<User[]>;
  getUser(id: string): Promise<User>;
  createUser(user: UserInsert): Promise<void>;
}
