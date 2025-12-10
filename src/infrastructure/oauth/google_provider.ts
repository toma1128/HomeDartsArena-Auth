import type { IGoogleAuthProvider, GoogleUser } from '../../adapter/provider/google_auth_provider';

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
        const params = new URLSearchParams({
            client_id: this.clientId!,
            redirect_uri: this.redirectUrl!,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'online',
            prompt: 'consent'
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }

    async getGoogleUser(code: string): Promise<GoogleUser> {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: this.clientId!,
                client_secret: this.clientSecret!,
                redirect_uri: this.redirectUrl!,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            throw new Error(`Failed to fetch token: ${errorText}`);
        }

        const tokens = await tokenResponse.json() as any;
        const accessToken = tokens.access_token;
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!userResponse.ok) {
             const errorText = await userResponse.text();
             throw new Error(`Failed to fetch user info: ${errorText}`);
        }

        const userData = await userResponse.json() as any;

        return {
            googleId: userData.id,
            email: userData.email
        };
    }
}