//run locally
import { app } from "./app.js";
import { config } from "./config/config.js";
import { initDB } from "./db/initDB.js";
import { radioService } from "./services/radioService.instance.js";

(async () => {
  await initDB();

  const count = await radioService.countStations();
  if (count === 0) {
    console.log("First run: fetching stations...");
    const stations = await radioService.fetchAllStations();
    await radioService.saveStationsToDB(stations);
  }

  app.listen(config.port, () => {
    console.log(`Local server running on port ${config.port}`);
  });
})();
