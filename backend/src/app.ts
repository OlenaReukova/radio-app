import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./utils/errorHandler.js";

export const app = express();

app.use(cors({ origin: "*", methods: ["GET", "OPTIONS"] }));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);
