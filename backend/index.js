import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/radio", async (req, res) => {
  const stationFilter = req.query.filter || "all";
  try {
    const response = await fetch(
      `https://de1.api.radio-browser.info/json/stations/search?language=english&tag=${stationFilter}&limit=30`
    );
    const data = await response.json();

    console.log("Fetched data from API:", data);

    res.json(data);
  } catch (error) {
    console.error("Error fetching radio stations", error);
    res.status(500).json({ message: "Error fetching radio stations" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
