import type { IUserRepository } from "../../adapter/repository/user_repository";
import type { User } from "../../domain/entity/user";

export class DBUserRepository implements IUserRepository {
    async findByGoogleId(googleId: string): Promise<User | null> {
        console.log(googleId);
        return null;
    }

    async createUser(user: User): Promise<User> {
        console.log(user);
        return user;
    }
}