import { createClient } from "@libsql/client";
import { ENV } from "../config/env.js";

export const db = createClient({
  url: ENV.TURSO_DATABASE_URL,
  authToken: ENV.TURSO_AUTH_TOKEN,
});
