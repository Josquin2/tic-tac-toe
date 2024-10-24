import {
  mysqlTable,
  text,
  int,
  timestamp,
  unique,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  created_at: timestamp("created_at").defaultNow(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});
