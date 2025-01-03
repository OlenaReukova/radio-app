import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./radio.avif";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      console.log("Fetched data from API:", data);
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    try {
      const baseUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
      const response = await fetch(
        `${baseUrl}/api/radio?filter=${stationFilter}`
      );
      const data = await response.json();
      console.log("Fetched data from API:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="stations">
        {stations &&
          stations.map((station, index) => {
            console.log(station);
            console.log(station.url_resolved);

            const shortName =
              station.name.length > 36
                ? station.name.slice(0, 36) + "..."
                : station.name;

            return (
              <div className="station" key={index}>
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon}
                    alt="station logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{shortName}</div>
                </div>

                {station.url_resolved ? (
                  <AudioPlayer
                    className="player"
                    src={station.url_resolved}
                    showJumpControls={false}
                    layout="stacked"
                    customVolumeControls={[RHAP_UI.VOLUME]}
                    customProgressBarSection={[]}
                    customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                    autoPlayAfterSrcChange={false}
                  />
                ) : (
                  <p>Stream URL not available</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
