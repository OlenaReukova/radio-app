import express from "express";
import cors from "cors";
import { config, ENV } from "./config.js";
import { initDB } from "./db.js";
import { redis } from "./redis.js";
import { radioService } from "./radioService.instance.js";

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "OPTIONS"] }));
app.options("*", cors());

await initDB();

const stationsCount = await radioService.countStations();
if (stationsCount === 0) {
  console.log("First run: fetching and saving all stations...");
  const stations = await radioService.fetchAllStations("all");
  await radioService.saveStationsToDB(stations);
}

app.get("/api/radio", async (req, res, next) => {
  try {
    let { country = "All countries", genre = "all" } = req.query;

    const filters = {};
    if (country && country !== "All countries") filters.country = country;
    if (genre && genre !== "all") filters.genre = genre;

    const cacheKey = `radio:${filters.country ?? "All"}:${
      filters.genre ?? "All"
    }`;

    const cachedRaw = await redis.get(cacheKey);
    if (cachedRaw != null) {
      try {
        const cached =
          typeof cachedRaw === "string" ? JSON.parse(cachedRaw) : cachedRaw;

        if (Array.isArray(cached)) {
          console.log("Cache HIT:", cacheKey);
          res.setHeader("X-Cache", "HIT");
          return res.json(cached);
        }
        await redis.del(cacheKey);
      } catch {
        await redis.del(cacheKey);
      }
    }

    const data = await radioService.getStationsFromDB(filters);

    await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 });

    res.setHeader("X-Cache", "MISS");
    return res.json(data);
  } catch (err) {
    console.error("Route error (/api/radio):", err);
    next(err);
  }
});

app.get("/api/refresh", async (req, res) => {
  try {
    const stations = await radioService.fetchAllStations("all");
    await radioService.saveStationsToDB(stations);
    //clear redis cache
    await redis.flushall();

    res.json({ ok: true, message: "Stations refreshed and cache cleared" });
  } catch (err) {
    console.error("Error during refresh:", err);
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

if (!ENV.VERCEL) {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

export default app;
