import { getDB } from "~/server/database/connection";
import { usersTable } from "~/server/migrations/user-schema";
import { hashPassword } from "~/server/server-functions";
import { sql } from "drizzle-orm";
import { User } from "~/types/User";
import "dotenv/config";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const db = await getDB();

    // Check if the username exists
    const rows: User[] = await db
      .select()
      .from(usersTable)
      .where(sql`username = ${body.username} `)
      .execute();

    if (rows.length > 0) {
      // Check if the password matches
      if (hashPassword(body.password) === rows[0].password) {
        return {
          status: 200,
          user: rows[0],
        };
      } else {
        return {
          status: 401,
          error: "Wrong password",
        };
      }
    } else {
      return {
        status: 404,
        error: "User not found",
      };
    }
  } catch (error) {
    console.error("Database connection error: ", error);
    return {
      status: 500,
      error: "Database connection error",
      details: error,
    };
  }
});
