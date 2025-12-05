import { Router } from "express";
import { redis } from "../redis/redisClient.js";
import { radioService } from "../services/radioService.instance.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const stations = await radioService.fetchAllStations("all");
    await radioService.saveStationsToDB(stations);

    await redis.flushall();

    res.json({ ok: true, message: "Stations refreshed and cache cleared" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
