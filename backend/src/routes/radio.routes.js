import { Router } from "express";
import { redis } from "../redis/redisClient.js";
import { radioService } from "../services/radioService.instance.js";

const router = Router();
router.get("/", async (req, res, next) => {
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

export default router;
