import fetch from "node-fetch";
import { config } from "./config.js";
import { db } from "./db.js";

function isValidUrl(url) {
  return typeof url === "string" && /^https?:\/\/[^\s]+$/.test(url);
}

async function fetchWithTimeout(
  url,
  options = {},
  timeout = config.defaultTimeout
) {
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
}

async function getActiveMirrors() {
  try {
    const mirrors = await fetchWithTimeout(
      "https://all.api.radio-browser.info/json/servers"
    );
    return mirrors.map((m) => `https://${m.name}`);
  } catch {
    return [
      "https://de1.api.radio-browser.info",
      "https://de2.api.radio-browser.info",
      "https://fi1.api.radio-browser.info",
    ];
  }
}

export const radioService = {
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

      const data = await fetchWithTimeout(url);
      if (!data || data.length === 0) break;

      const newOnes = data.filter((s) => !seen.has(s.stationuuid));
      if (newOnes.length === 0) break;

      newOnes.forEach((s) => seen.add(s.stationuuid));
      allStations = allStations.concat(newOnes);
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

  async countStations() {
    const { rows } = await db.execute("SELECT COUNT(*) AS count FROM stations");
    return Number(rows[0]?.count || 0);
  },
};
