import { d as defineEventHandler, r as readBody } from '../../../runtime.mjs';
import { g as getDB, u as usersTable, h as hashPassword } from '../../../_/server-functions.mjs';
import { sql } from 'drizzle-orm';
import 'node:http';
import 'node:https';
import 'events';
import 'https';
import 'http';
import 'net';
import 'tls';
import 'crypto';
import 'stream';
import 'url';
import 'zlib';
import 'buffer';
import 'node:fs';
import 'node:path';
import 'engine.io';
import 'socket.io';
import 'node:url';
import 'mysql2/promise';
import 'drizzle-orm/mysql2';
import 'drizzle-orm/mysql-core';
import 'js-sha256';

const signup = defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const db = await getDB();
    const existingUser = await db.select().from(usersTable).where(sql`username = ${body.username}`).execute();
    if (existingUser.length > 0) {
      return {
        status: 400,
        error: "Username already exists"
      };
    }
    await db.insert(usersTable).values({
      username: body.username,
      password: hashPassword(body.password)
    }).execute();
    const rows = await db.select().from(usersTable).where(sql`username = ${body.username} `).execute();
    return {
      status: 200,
      user: rows[0]
    };
  } catch (error) {
    console.error("Database connection error: ", error);
    return {
      status: 500,
      error: "Database connection error",
      details: error
    };
  }
});

export { signup as default };
//# sourceMappingURL=signup.mjs.map
