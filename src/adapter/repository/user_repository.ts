import type {User} from "../../domain/entity/user";

export interface IUserRepository {
    findByGoogleId(googleId: string): Promise<User | null>; // GoogleID検索
    //findByEmail(email: string): Promise<User | null>;   // Email検索
    createUser(user: User): Promise<User>;  // ユーザー作成
}