import type {Context} from "hono";
import {AuthUsecase} from "../../domain/usecase/auth_usecase";
import type {IGoogleAuthProvider} from "../provider/google_auth_provider";

export class AuthController {
    constructor(
        private authUsecase: AuthUsecase,
        private googleProvider: IGoogleAuthProvider,    //リダイレクトURL取得
    ) {}

    // /auth/google
    async redirectGoogle(c: Context) {
        const redirectUrl = this.googleProvider.getRedirectUrl();
        return c.redirect(redirectUrl);
    }

    // /auth/google/callback
    async handleGoogleCallback(c: Context) {
        // contextからcodeを取得
        const code = c.req.query("code");
        if (!code) {
            return c.json({error: 'Code is required'}, 400);
        }

        try {
            const jwt = await this.authUsecase.handleGoogleCallback(code);  //Usecaseで処理
            return c.json({token: jwt});    //インフラにレスポンスを返す
        }catch (e) {
            return c.json({error: 'Internal Server Error'}, 500);
        }
    }
}