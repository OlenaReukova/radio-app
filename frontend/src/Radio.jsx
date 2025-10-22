import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./radio.avif";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });
  const [sortByCountry, setSortByCountry] = useState(false);

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

  const toggleFavourite = (station) => {
    const exists = favourites.find((f) => f.stationuuid === station.stationuuid);
    let updated;
    if (exists) {
      updated = favourites.filter((f) => f.stationuuid !== station.stationuuid);
    } else {
      updated = [...favourites, station];
    }
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const sortedStations = sortByCountry
    ? [...stations].sort((a, b) =>
        (a.country || "").localeCompare(b.country || "")
      )
    : stations;

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

      <div style={{ margin: "1rem 0" }}>
        <button
          onClick={() => setSortByCountry(!sortByCountry)}
          style={{
            marginRight: "0.5rem",
            background: sortByCountry ? "#8c52ff" : "#2e2e2e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
          }}
        >
          {sortByCountry ? "Сортировка: по странам ↑" : "Сортировать по странам"}
        </button>

        <button
          onClick={() => setStations(favourites)}
          style={{
            background: "#8c52ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
          }}
        >
          ⭐ Показать избранное
        </button>
      </div>

      <div className="stations">
        {sortedStations &&
          sortedStations.map((station, index) => {
            const shortName =
              station.name.length > 36
                ? station.name.slice(0, 36) + "..."
                : station.name;

            const isFav = favourites.some(
              (f) => f.stationuuid === station.stationuuid
            );

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

                <div style={{ marginBottom: "0.5rem" }}>
                  <button
                    onClick={() => toggleFavourite(station)}
                    style={{
                      background: isFav ? "#ff5a79" : "#444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.3rem 0.6rem",
                      cursor: "pointer",
                    }}
                  >
                    {isFav ? "Удалить из избранного" : "Добавить в избранное"}
                  </button>
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
