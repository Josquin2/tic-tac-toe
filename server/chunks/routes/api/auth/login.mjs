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

const login = defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const db = await getDB();
    const rows = await db.select().from(usersTable).where(sql`username = ${body.username} `).execute();
    if (rows.length > 0) {
      if (hashPassword(body.password) === rows[0].password) {
        return {
          status: 200,
          user: rows[0]
        };
      } else {
        return {
          status: 401,
          error: "Wrong password"
        };
      }
    } else {
      return {
        status: 404,
        error: "User not found"
      };
    }
  } catch (error) {
    console.error("Database connection error: ", error);
    return {
      status: 500,
      error: "Database connection error",
      details: error
    };
  }
});

export { login as default };
//# sourceMappingURL=login.mjs.map
