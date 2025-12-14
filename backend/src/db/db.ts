import { createClient } from "@libsql/client";
import { ENV } from "../config/env.js";

const url = ENV.TURSO_DATABASE_URL;
if (!url) {
  throw new Error("TURSO_DATABASE_URL is missing");
}
const authToken = ENV.TURSO_AUTH_TOKEN;
if (!authToken) {
  throw new Error("authToken is missing");
}

export const db = createClient({
  url,
  authToken,
});
