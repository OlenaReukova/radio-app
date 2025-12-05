import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || "5000",
  REDIS_URL: process.env.REDIS_URL,
  REDIS_TOKEN: process.env.REDIS_TOKEN,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  VERCEL: process.env.VERCEL || "",
};

["REDIS_URL", "REDIS_TOKEN", "TURSO_DATABASE_URL", "TURSO_AUTH_TOKEN"].forEach(
  (key) => {
    if (!env[key]) {
      throw new Error(`Missing env: ${key}`);
    }
  }
);

export const config = {
  port: Number(env.PORT),
  defaultTimeout: 10000,
  batchSize: 200,
};

export const ENV = env;
