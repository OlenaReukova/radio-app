import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  defaultTimeout: 5000,
  statusTimeout: 3000,
  defaultLimit: 30,
};

const createTimeoutFetch = async (url, options = {}, timeout = config.defaultTimeout) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

const getActiveMirrors = async () => {
  try {
    const response = await fetch("https://all.api.radio-browser.info/json/servers");
    const mirrors = await response.json();
    return mirrors.map(m => `https://${m.name}`);
  } catch (err) {
    console.error("Failed to fetch mirrors:", err.message);
    // fallback на рабочие известные зеркала
    return [
      "https://de1.api.radio-browser.info",
      "https://de2.api.radio-browser.info",
      "https://fi1.api.radio-browser.info",
    ];
  }
};

const radioService = {
  async fetchStations(filter = "all", limit = config.defaultLimit) {
    const tag = filter === "all" ? "" : filter;
    const mirrors = await getActiveMirrors();
    const errors = [];

    for (const mirror of mirrors) {
      try {
        const url = `${mirror}/json/stations/search?language=english&tag=${tag}&limit=${limit}`;
        console.log(`Trying API mirror: ${url}`);

        const data = await createTimeoutFetch(url, {
          headers: { "User-Agent": "RadioApp/1.0", Accept: "application/json" },
        });

        console.log(`Fetched ${data.length} stations from ${mirror}`);
        return data;
      } catch (error) {
        console.error(`Error with mirror ${mirror}:`, error.message);
        errors.push(`${mirror}: ${error.message}`);
      }
    }

    throw {
      status: 503,
      message: "Unable to fetch radio stations from any API mirror",
      errors,
    };
  },

  async checkStatus() {
    const mirrors = await getActiveMirrors();
    return Promise.all(
      mirrors.map(async (mirror) => {
        try {
          const data = await createTimeoutFetch(
            `${mirror}/json/stats`,
            {},
            config.statusTimeout
          );

          return {
            mirror,
            status: "up",
            stations: data.stations,
            response_time: data.response_time_ms || "unknown",
          };
        } catch (error) {
          return { mirror, status: "down", error: error.message };
        }
      })
    );
  },
};

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "OPTIONS"] }));
app.options("*", cors());

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    errors: err.errors,
  });
};

app.get("/", (_, res) => res.send("Welcome to the Radio App API!"));

app.get("/api/radio", async (req, res, next) => {
  try {
    const { filter = "all", limit = config.defaultLimit } = req.query;
    const data = await radioService.fetchStations(filter, limit);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get("/api/status", async (_, res, next) => {
  try {
    const status = await radioService.checkStatus();
    res.json(status);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`✅ Server running on port ${config.port}`);
});

export default app;
