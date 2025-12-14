import { useEffect, useState, useCallback } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer.js";
import defaultImage from "./radio.avif";

type Station = {
  stationuuid: string;
  name: string;
  country: string;
  favicon?: string;
  url_resolved: string;
};

export default function Radio() {
  const [stations, setStations] = useState<Station[]>([]);
  const [stationFilter, setStationFilter] = useState("all");
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All countries");
  const [currentPage, setCurrentPage] = useState(1);

  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const stationsPerPage = 20;

  useEffect(() => {
    setupApi(stationFilter, selectedCountry).then((data) => {
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
      setCurrentPage(1);
    });
  }, [stationFilter, selectedCountry]);

  const setupApi = async (
    stationFilter: string,
    selectedCountry: string
  ): Promise<Station[]> => {
    try {
      const baseUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

      const params = new URLSearchParams();
      if (stationFilter && stationFilter !== "all") {
        params.append("genre", stationFilter);
      }
      if (selectedCountry && selectedCountry !== "All countries") {
        params.append("country", selectedCountry);
      }

      const response = await fetch(`${baseUrl}/api/radio?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch radio stations");

      const data = (await response.json()) as Station[];
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };

  const handlePlay = useCallback((src: string | null) => {
    setActiveSrc(src);
  }, []);

  const handleError = useCallback(() => {
    alert("Станция недоступна");
  }, []);

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

  const setDefaultSrc = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultImage;
  };

  const filteredStations = stations.filter((station) => {
    if (selectedCountry === "All countries") return true;
    return station.country === selectedCountry;
  });

  const totalPages = Math.ceil(filteredStations.length / stationsPerPage);
  const startIndex = (currentPage - 1) * stationsPerPage;
  const currentStations = filteredStations.slice(
    startIndex,
    startIndex + stationsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

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
      {/* Sidebar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "220px",
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

      {/* Main content */}
      <div className="stations" style={{ flex: 1 }}>
        {currentStations.length === 0 ? (
          <p style={{ color: "#ccc" }}>No stations found.</p>
        ) : (
          currentStations.map((station, index) => {
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

                {/* Custom Audio Player */}
                <CustomAudioPlayer
                  key={station.stationuuid}
                  src={station.url_resolved}
                  isActive={activeSrc === station.url_resolved}
                  onPlay={handlePlay}
                  onError={handleError}
                />
              </div>
            );
          })
        )}

        {/* Pagination */}
        {filteredStations.length > stationsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              gap: "1rem",
            }}
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                background: "#444",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              ⬅ Prev
            </button>
            <span style={{ color: "#fff" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                background: "#444",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
