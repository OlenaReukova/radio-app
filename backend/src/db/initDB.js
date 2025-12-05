import { db } from "./db.js";

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

  console.log("Turso Database initialised");
}
