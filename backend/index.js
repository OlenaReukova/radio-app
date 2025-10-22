import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  defaultTimeout: 10000,
  statusTimeout: 3000,
  batchSize: 200,
  refreshInterval: 1000 * 60 * 60 * 24,
};

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const initDB = async () => {
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
  console.log("🗄️ Database initialised (Turso SQLite)");
};

const createTimeoutFetch = async (
  url,
  options = {},
  timeout = config.defaultTimeout
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

const getActiveMirrors = async () => {
  try {
    const response = await fetch(
      "https://all.api.radio-browser.info/json/servers"
    );
    const mirrors = await response.json();
    return mirrors.map((m) => `https://${m.name}`);
  } catch {
    return [
      "https://de1.api.radio-browser.info",
      "https://de2.api.radio-browser.info",
      "https://fi1.api.radio-browser.info",
    ];
  }
};

const radioService = {
  async fetchAllStations(filter = "all") {
    const tag = filter === "all" ? "" : filter;
    const mirrors = await getActiveMirrors();
    for (const mirror of mirrors) {
      try {
        const stations = await this.fetchAllFromMirror(mirror, tag);
        if (stations.length > 0) return stations;
      } catch (err) {
        console.error(`Mirror ${mirror} failed:`, err.message);
      }
    }
    return [];
  },

  async fetchAllFromMirror(mirror, tag) {
    let offset = 0;
    let allStations = [];
    const seen = new Set();

    while (true) {
      const params = new URLSearchParams({
        hidebroken: "true",
        limit: config.batchSize.toString(),
        offset: offset.toString(),
      });
      if (tag) params.append("tag", tag);
      const url = `${mirror}/json/stations?${params.toString()}`;
      console.log(`➡️ Fetching from ${mirror} offset=${offset}`);
      const data = await createTimeoutFetch(url);
      if (!data || data.length === 0) break;
      const newOnes = data.filter((s) => !seen.has(s.stationuuid));
      if (newOnes.length === 0) break;
      newOnes.forEach((s) => seen.add(s.stationuuid));
      allStations = [...allStations, ...newOnes];
      offset += config.batchSize;
    }
    console.log(`✅ Got ${allStations.length} stations total.`);
    return allStations;
  },

  async saveStationsToDB(stations) {
    console.log(`💾 Saving ${stations.length} stations to DB...`);
    const insertStmt = `
      INSERT OR REPLACE INTO stations 
      (stationuuid, name, country, tags, url_resolved, favicon)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    for (const s of stations) {
      await db.execute(insertStmt, [
        s.stationuuid,
        s.name || "",
        s.country || "",
        s.tags || "",
        s.url_resolved || "",
        s.favicon || "",
      ]);
    }
    console.log("Stations saved to DB");
  },

  async getStationsFromDB(filters = {}) {
    const conditions = [];
    const values = [];

    if (filters.country) {
      conditions.push("LOWER(country) = LOWER(?)");
      values.push(filters.country);
    }
    if (filters.genre) {
      conditions.push("LOWER(tags) LIKE LOWER(?)");
      values.push(`%${filters.genre}%`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";
    const sql = `SELECT * FROM stations ${whereClause} LIMIT 500`;
    const result = await db.execute(sql, values);
    return result.rows || [];
  },
};

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "OPTIONS"] }));
app.options("*", cors());

const refreshStations = async () => {
  console.log("♻️ Refreshing station data...");
  const stations = await radioService.fetchAllStations("all");
  await radioService.saveStationsToDB(stations);
};
initDB().then(refreshStations);

setInterval(refreshStations, config.refreshInterval);

app.get("/", (_, res) => res.send("Welcome to the Radio App API with Turso "));

app.get("/api/radio", async (req, res, next) => {
  try {
    const { country, genre } = req.query;
    const data = await radioService.getStationsFromDB({ country, genre });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
