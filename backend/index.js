import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

import { createClient } from "@libsql/client";

dotenv.config();
//update
const config = {
  port: process.env.PORT || 5000,
  defaultTimeout: 10000,
  batchSize: 200,
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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
  console.log("Database initialised (Turso SQLite)");
};

function isValidUrl(url) {
  return typeof url === "string" && /^https?:\/\/[^\s]+$/.test(url);
}

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
      console.log(`Fetching from ${mirror} (offset=${offset})`);

      const data = await createTimeoutFetch(url);
      if (!data || data.length === 0) break;

      const newOnes = data.filter((s) => !seen.has(s.stationuuid));
      if (newOnes.length === 0) break;

      newOnes.forEach((s) => seen.add(s.stationuuid));
      allStations = [...allStations, ...newOnes];
      offset += config.batchSize;
    }

    console.log(`Fetched ${allStations.length} stations from ${mirror}`);
    return allStations;
  },

  async saveStationsToDB(stations) {
    console.log(`Saving ${stations.length} stations to DB...`);

    const insertStmt = `
      INSERT OR REPLACE INTO stations 
      (stationuuid, name, country, tags, url_resolved, favicon)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const s of stations) {
      if (!isValidUrl(s.url_resolved)) continue;
      if (s.url_resolved.includes(".m3u8")) continue;

      await db.execute(insertStmt, [
        s.stationuuid,
        s.name || "",
        s.country || "",
        s.tags || "",
        s.url_resolved || "",
        isValidUrl(s.favicon) ? s.favicon : "",
      ]);
    }

    console.log("Stations saved to DB");
  },

  async getStationsFromDB(filters = {}) {
    const conditions = [];
    const values = [];

    if (filters.country) {
      conditions.push("LOWER(TRIM(country)) = LOWER(TRIM(?))");
      values.push(filters.country);
    }

    if (filters.genre) {
      conditions.push("LOWER(TRIM(tags)) LIKE LOWER(TRIM(?))");
      values.push(`%${filters.genre}%`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const sql = `
      SELECT *
      FROM stations
      ${whereClause}
      ORDER BY name ASC
      LIMIT 500
    `;

    const result = await db.execute(sql, values);
    return result.rows || [];
  },
};

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "OPTIONS"] }));
app.options("*", cors());

await initDB();

const { rows } = await db.execute("SELECT COUNT(*) AS count FROM stations");
if (rows[0].count === 0) {
  console.log("First run: fetching and saving all stations...");
  const stations = await radioService.fetchAllStations("all");
  await radioService.saveStationsToDB(stations);
}

app.get("/api/radio", async (req, res, next) => {
  try {
    const { country = "All countries", genre = "all" } = req.query;
    const cacheKey = `radio:${country}:${genre}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("✅ Cache HIT:", cacheKey);
      res.setHeader("X-Cache", "HIT");
      return res.json(JSON.parse(cached));
    }

    const data = await radioService.getStationsFromDB({ country, genre });

    await redis.set(cacheKey, JSON.stringify(data), "EX", 3600);
    res.setHeader("X-Cache", "MISS");

    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get("/api/refresh", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("Manual or cron refresh triggered...");
    const stations = await radioService.fetchAllStations("all");
    await radioService.saveStationsToDB(stations);

    await redis.flushall();

    res.json({ ok: true, message: "Stations refreshed and cache cleared" });
  } catch (err) {
    console.error("Error during refresh:", err);
    res.status(500).json({ ok: false, error: err.message });
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
