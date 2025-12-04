import fetch from "node-fetch";
import { db } from "./db.js";
import { config } from "./config.js";
import { createRadioService } from "./radioService.js";

export const radioService = createRadioService({
  fetch,
  db,
  config,
  logger: console,
});
