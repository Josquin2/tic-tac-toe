import mysql from "mysql2/promise";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export async function getDB() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT || "3306"),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  });
  const db = drizzle(connection);

  return db;
}
