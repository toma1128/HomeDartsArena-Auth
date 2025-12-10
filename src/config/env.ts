import 'dotenv/config';

export const env = {
  AUTH_PORT: parseInt(process.env.AUTH_PORT || '3033', 10),

  AUTH_HOST: process.env.AUTH_HOST! || '0.0.0.0',

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL!,

  // DB接続情報
  DB: {
    HOST: process.env.DB_HOST!,
    PORT: parseInt(process.env.DB_PORT || '3366', 10),
    USER: process.env.DB_USER!,
    PASSWORD: process.env.DB_PASS!,
    NAME: process.env.DB_NAME!,
  },
};

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URL || !process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  throw new Error('Missing required environment variables. Check .env file.');
}