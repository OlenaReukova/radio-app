import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  defaultTimeout: 10000,
  statusTimeout: 3000,
  batchSize: 100,
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
  } catch (err) {
    console.error("⚠️ Failed to fetch mirrors:", err.message);
    // fallback mirrors
    return [
      "https://de1.api.radio-browser.info",
      "https://de2.api.radio-browser.info",
      "https://fi1.api.radio-browser.info",
    ];
  }
};

const radioService = {
  async fetchStations(filter = "all") {
    const tag = filter === "all" ? "" : filter;
    const mirrors = await getActiveMirrors();
    const errors = [];

    for (const mirror of mirrors) {
      try {
        console.log(`🌐 Fetching from mirror: ${mirror}`);
        const allStations = await this.fetchAllFromMirror(mirror, tag);
        if (allStations.length > 0) {
          console.log(
            `Successfully fetched ${allStations.length} stations from ${mirror}`
          );
          return allStations;
        }
      } catch (error) {
        console.error(`Error with mirror ${mirror}:`, error.message);
        errors.push(`${mirror}: ${error.message}`);
      }
    }

    throw {
      status: 503,
      message: "Unable to fetch working stations from any API mirror",
      errors,
    };
  },

  async fetchAllFromMirror(mirror, tag) {
    let offset = 0;
    let allStations = [];
    let batchCount = 0;

    while (true) {
      const baseUrl = `${mirror}/json/stations`;
      const params = new URLSearchParams({
        hidebroken: "true",
        limit: config.batchSize.toString(),
        offset: offset.toString(),
      });
      if (tag) params.append("tag", tag);
      params.append("language", "english");

      const url = `${baseUrl}?${params.toString()}`;

      console.log(
        `➡️ Fetching batch ${++batchCount} from ${mirror} (offset: ${offset})`
      );

      const data = await createTimeoutFetch(url, {
        headers: {
          "User-Agent": "RadioApp/1.0",
          Accept: "application/json",
        },
      });

      if (!data || data.length === 0) break;

      allStations = [...allStations, ...data];
      offset += config.batchSize;
    }

    return allStations;
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
    const { filter = "all" } = req.query;
    const data = await radioService.fetchStations(filter);
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
  console.log(`Server running on port ${config.port}`);
});

export default app;
