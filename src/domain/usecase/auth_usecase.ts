import type {IUserRepository} from "../../adapter/repository/user_repository";
import type {IGoogleAuthProvider} from "../../adapter/provider/google_auth_provider";
import type {IJwtProvider} from "../../adapter/provider/jwt_provider";
import type {User} from "../entity/user";

export class AuthUsecase {
    constructor(
        private userRepo: IUserRepository,
        private googleProvider: IGoogleAuthProvider,
        private jwtProvider: IJwtProvider,
    ){}

    async handleGoogleCallback(code: string): Promise<string> {
        // Googleのユーザー情報を取得する
        const googleUser = await this.googleProvider.getGoogleUser(code);

        // ユーザーを検索する
        let user = await this.userRepo.findByGoogleId(googleUser.googleId);
        if (!user) {
            // ユーザーが存在しない場合は新規作成する
            user = await this.userRepo.createUser({
                uuid: crypto.randomUUID(),
                email: googleUser.email,
                password: "",
                googleId: googleUser.googleId,
            });
        }

        // JWTを発行する
        const jwt = await this.jwtProvider.generateToken(user.uuid);
        return jwt;
    }

}