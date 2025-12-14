import { db } from "../db/db.js";
import { config } from "../config/config.js";
import { createRadioService } from "./radioService.js";

export const radioService = createRadioService({
  fetch: globalThis.fetch,
  db,
  config,
  logger: console,
});
