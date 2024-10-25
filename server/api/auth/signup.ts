import { getDB } from "~/server/database/connection";
import { usersTable } from "../../migrations/user-schema";
import { sql } from "drizzle-orm";
import { hashPassword } from "@/server/server-functions";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const db = await getDB();

    // Check if the username already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(sql`username = ${body.username}`)
      .execute();

    if (existingUser.length > 0) {
      return {
        status: 400,
        error: "Username already exists",
      };
    }

    // Insert new user
    await db
      .insert(usersTable)
      .values({
        username: body.username,
        password: hashPassword(body.password),
      })
      .execute();

    // Retrieve the newly created user
    const rows = await db
      .select()
      .from(usersTable)
      .where(sql`username = ${body.username} `)
      .execute();

    return {
      status: 200,
      user: rows[0],
    };
  } catch (error) {
    console.error("Database connection error: ", error);
    return {
      status: 500,
      error: "Database connection error",
      details: error,
    };
  }
});
