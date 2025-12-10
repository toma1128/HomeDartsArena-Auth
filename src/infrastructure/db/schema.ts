import { mysqlTable, varchar, char } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  uuid: char('uuid', { length: 36 }).primaryKey(),
  
  email: varchar('email', { length: 255 }).notNull().unique(),

  password: varchar('password', { length: 255 }),
  
  googleId: varchar('google_id', { length: 255 }).unique(),
});