import { mysqlTable, varchar, char, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  uuid: char('uuid', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  googleId: varchar('google_id', { length: 255 }).unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const INIT_SQL = `
CREATE TABLE IF NOT EXISTS users (
  uuid CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  google_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;