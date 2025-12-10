import { Hono } from 'hono';
import { AuthController } from '../../adapter/controller/auth_controller';
import { AuthUsecase } from '../../domain/usecase/auth_usecase';
import { DBUserRepository } from '../db/db_user_repository';
import { HonoGoogleAuthProvider } from '../oauth/google_provider';
import { LuciaJwtProvider } from '../session/lucia_provider';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema.ts';

// DBを受け取ってアプリを組み立てて返す関数
export function createApp(db: MySql2Database<typeof schema>) {
    const app = new Hono();

    // 依存関係の組み立て
    const userRepository = new DBUserRepository(db);
    const googleProvider = new HonoGoogleAuthProvider();
    const jwtProvider = new LuciaJwtProvider();

    const authUsecase = new AuthUsecase(userRepository, googleProvider, jwtProvider);
    const authController = new AuthController(authUsecase, googleProvider);

    // ルーティング設定
    app.get('/auth/google', (c) => authController.redirectGoogle(c));
    app.get('/auth/google/callback', (c) => authController.handleGoogleCallback(c));

    return app;
}