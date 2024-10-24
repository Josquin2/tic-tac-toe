import { getDB } from "~/server/database/connection";
import { usersTable } from "../../migrations/user-schema";
import { sql } from "drizzle-orm";
import { hashPassword } from "@/server/server-functions";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const db = await getDB();
    await db
      .insert(usersTable)
      .values({
        username: body.username,
        password: hashPassword(body.password),
      })
      .execute();

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
      error: "Database connection error",
      details: error,
    };
  }
});
