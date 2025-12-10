import type { IGoogleAuthProvider, GoogleUser } from "../../adapter/provider/google_auth_provider";

export class HonoGoogleAuthProvider implements IGoogleAuthProvider {

    constructor(
        private clientId: string | undefined = process.env.GOOGLE_CLIENT_ID,
        private clientSecret: string | undefined = process.env.GOOGLE_CLIENT_SECRET,
        private redirectUrl: string | undefined = process.env.GOOGLE_REDIRECT_URL
    ) {
        if (!this.clientId) {
            throw new Error('GOOGLE_CLIENT_ID is not set');
        }
        if (!this.clientSecret) {
            throw new Error('GOOGLE_CLIENT_SECRET is not set');
        }
        if (!this.redirectUrl) {
            throw new Error('GOOGLE_REDIRECT_URL is not set');
        }
    }

    getRedirectUrl(): string {

        return 'https://accounts.google.com/o/oauth2/v2/auth?...(stub_url)';
    }
    async getGoogleUser(code: string): Promise<GoogleUser> {
        return {
            googleId: 'stub_google_id',
            email: 'stub_email'
        }
    }
}