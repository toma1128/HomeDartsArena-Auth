import mysql from 'mysql2/promise';
import { drizzle, DrizzleMySQL2Database } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
//import * as schema from './schema';
import { env } from '../../config/env';

export async function initializeDatabase(): Promise<DrizzleMySQL2Database<typeof schema>> {
    const { HOST, PORT, USER, PASSWORD, NAME } = env.DB;

    const adminConnection = await mysql.createConnection({
        host: HOST,
        port: PORT,
        user: USER,
        password: PASSWORD,
    });

    try {
        await adminConnection.query(`CREATE DATABASE IF NOT EXISTS ??`, [NAME]);
        console.log(`Database '${NAME}' check passed.`);
    } finally {
        await adminConnection.end();
    }

  // 2. アプリケーション用の接続とマイグレーション
    const connection = await mysql.createConnection({
        host: HOST,
        port: PORT,
        user: USER,
        password: PASSWORD,
        database: NAME,
    });

    const db = drizzle(connection, { schema, mode: 'default' });

    // マイグレーション実行
    console.log('🔄 Running migrations...');
    await migrate(db, { migrationsFolder: './src/infrastructure/db/migrations' });
    console.log('✅ Migrations completed.');

    return db;
}