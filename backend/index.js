import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  apiMirrors: [
    "https://de1.api.radio-browser.info",
    "https://at1.api.radio-browser.info",
    "https://nl1.api.radio-browser.info",
    "https://fr1.api.radio-browser.info",
  ],
  defaultTimeout: 5000,
  statusTimeout: 3000,
  defaultLimit: 30,
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

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

const radioService = {
  async fetchStations(filter = "all", limit = config.defaultLimit) {
    const tag = filter === "all" ? "" : filter;
    const errors = [];

    for (const mirror of config.apiMirrors) {
      try {
        const url = `${mirror}/json/stations/search?language=english&tag=${tag}&limit=${limit}`;
        console.log(`Trying API mirror: ${url}`);

        const data = await createTimeoutFetch(url, {
          headers: {
            "User-Agent": "RadioApp/1.0",
            Accept: "application/json",
          },
        });

        console.log(
          `Successfully fetched ${data.length} stations from ${mirror}`
        );
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
    return Promise.all(
      config.apiMirrors.map(async (mirror) => {
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
          return {
            mirror,
            status: "down",
            error: error.message,
          };
        }
      })
    );
  },
};

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
    errors: err.errors,
  });
};

app.get("/", (req, res) => {
  res.send("Welcome to the Radio App API!");
});

app.get("/api/radio", async (req, res, next) => {
  try {
    const { filter = "all", limit = config.defaultLimit } = req.query;
    const data = await radioService.fetchStations(filter, limit);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get("/api/status", async (req, res, next) => {
  try {
    const status = await radioService.checkStatus();
    res.json(status);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
