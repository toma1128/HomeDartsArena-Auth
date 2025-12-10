import type { MySql2Database } from "drizzle-orm/mysql2";
import type { IUserRepository } from "../../adapter/repository/user_repository";
import type { User } from "../../domain/entity/user";
import * as schema from "./schema.ts"

export class DBUserRepository implements IUserRepository {
    constructor(private db: MySql2Database<typeof schema>) {}
    
    async findByGoogleId(googleId: string): Promise<User | null> {
        console.log(googleId);
        return null;
    }

    async createUser(user: User): Promise<User> {
        console.log(user);
        return user;
    }
}