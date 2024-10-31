import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { mysqlTable, int, timestamp, text } from 'drizzle-orm/mysql-core';
import { sha256 } from 'js-sha256';

async function getDB() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT || "3306"),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  });
  const db = drizzle(connection);
  return db;
}

const usersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  created_at: timestamp("created_at").defaultNow(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});

function hashPassword(password) {
  return sha256(password);
}

export { getDB as g, hashPassword as h, usersTable as u };
//# sourceMappingURL=server-functions.mjs.map
