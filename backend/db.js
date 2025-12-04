import { createClient } from "@libsql/client";
import { ENV } from "./config.js";

export const db = createClient({
  url: ENV.TURSO_DATABASE_URL,
  authToken: ENV.TURSO_AUTH_TOKEN,
});

export async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS stations (
      stationuuid TEXT PRIMARY KEY,
      name TEXT,
      country TEXT,
      tags TEXT,
      url_resolved TEXT,
      favicon TEXT
    )
    `);

  console.log("TTurso Database initialised");
}
