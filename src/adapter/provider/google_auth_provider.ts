// Googleが返すユーザー情報
export type GoogleUser = {
    googleId: string;
    email: string;
};

export interface IGoogleAuthProvider {
    getRedirectUrl(): string;
    getGoogleUser(code: string): Promise<GoogleUser>;
}
