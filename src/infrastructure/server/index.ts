import mysql from 'mysql2/promise';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';
import { env } from '../../config/env';
import { createApp } from './app';
import { createTables } from '../db/create_tables';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function initializeDatabase(): Promise<MySql2Database<typeof schema>> {
    const { HOST, PORT, USER, PASSWORD, NAME } = env.DB;

    console.log(`🔌 Connecting to ${HOST}:${PORT} as ${USER}...`);
    
    // 1. 接続リトライロジック
    let retries = 10;
    while (retries > 0) {
        try {
            const checkConn = await mysql.createConnection({
                host: HOST, port: PORT, user: USER, password: PASSWORD,
            });
            await checkConn.end();
            console.log('✅ Connected to Database server successfully.');
            break;
        } catch (error) {
            retries--;
            console.warn(`⏳ Waiting for Database... (${retries} retries left)`);
            if (retries === 0) {
                console.error('❌ Failed to connect. Exiting...');
                throw error;
            }
            await wait(3000);
        }
    }

    const adminConnection = await mysql.createConnection({
        host: HOST, port: PORT, user: USER, password: PASSWORD,
    });
    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS ??`, [NAME]);
    await adminConnection.end();

    // 3. アプリ用接続
    const connection = await mysql.createConnection({
        host: HOST,
        port: PORT,
        user: USER,
        password: PASSWORD,
        database: NAME,
        multipleStatements: true
    });

    await createTables(connection);

    const db = drizzle(connection, { schema, mode: 'default' });

    return db;
}

const db = await initializeDatabase();
const app = createApp(db);

export default {
    port: env.AUTH_PORT,
    host: env.AUTH_HOST,
    fetch: app.fetch
}