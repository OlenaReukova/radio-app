import { ENV } from "./env.js";

export const config = {
  port: Number(ENV.PORT),
  defaultTimeout: 10000,
  batchSize: 200,
};
