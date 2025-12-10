import type { Connection } from 'mysql2/promise';
import { INIT_SQL } from './schema';

export async function createTables(connection: Connection): Promise<void> {
    console.log('hw Checking tables...');

    try {
        await connection.query(INIT_SQL);
        console.log('✅ Tables checked/created successfully.');
    } catch (error) {
        console.error('❌ Failed to execute INIT_SQL:', error);
        throw error;
    }
}