import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./radio.avif";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All countries");

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
      const uniqueCountries = [
        ...new Set(
          data
            .map((s) => s.country)
            .filter((c) => c && c.trim() !== "")
            .sort()
        ),
      ];
      setCountries(["All countries", ...uniqueCountries]);
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

  const filteredStations = stations.filter((station) => {
    if (selectedCountry === "All countries") return true;
    return station.country === selectedCountry;
  });

  return (
    <div
      className="radio"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {/* Left sidebar country dropdown */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          background: "#1f1f2e",
          borderRadius: "8px",
          padding: "1rem",
          color: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
          🌍 Country
        </h3>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            background: "#2b2b3d",
            color: "#fff",
            border: "1px solid #555",
            marginBottom: "1rem",
          }}
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <div
          className="filters"
          style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
        >
          <h4 style={{ marginBottom: "0.2rem", fontSize: "1rem" }}>
            🎶 Genres
          </h4>
          {filters.map((filter, index) => (
            <span
              key={index}
              className={stationFilter === filter ? "selected" : ""}
              onClick={() => setStationFilter(filter)}
              style={{
                padding: "0.3rem 0.5rem",
                cursor: "pointer",
                borderRadius: "4px",
                background:
                  stationFilter === filter ? "#8c52ff" : "transparent",
                color: "#fff",
                transition: "all 0.2s ease",
              }}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      {/* Stations list */}
      <div className="stations" style={{ flex: 1 }}>
        {filteredStations.length === 0 ? (
          <p style={{ color: "#ccc" }}>No stations found.</p>
        ) : (
          filteredStations.map((station, index) => {
            const shortName =
              station.name.length > 36
                ? station.name.slice(0, 36) + "..."
                : station.name;

            return (
              <div
                className="station"
                key={index}
                style={{
                  background: "#1f1f2e",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                  padding: "1rem",
                  color: "#fff",
                }}
              >
                <div
                  className="stationName"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                  }}
                >
                  <img
                    className="logo"
                    src={station.favicon || defaultImage}
                    alt="station logo"
                    onError={setDefaultSrc}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="name" style={{ fontSize: "1rem" }}>
                    {shortName}
                  </div>
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
                    style={{ marginTop: "0.5rem" }}
                  />
                ) : (
                  <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                    Stream URL not available
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
