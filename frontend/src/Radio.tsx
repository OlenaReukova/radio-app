import { useEffect, useState, useCallback } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer";
import defaultImage from "./radio.avif";
import { StationCard } from "./components/organisms/StationCard";

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

  // =========================
  // DATA FETCHING
  // =========================
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
    filter: string,
    country: string
  ): Promise<Station[]> => {
    try {
      const baseUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

      const params = new URLSearchParams();
      if (filter !== "all") params.append("genre", filter);
      if (country !== "All countries") params.append("country", country);

      const response = await fetch(`${baseUrl}/api/radio?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch stations");

      return (await response.json()) as Station[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // =========================
  // AUDIO CONTROL
  // =========================
  const handlePlay = useCallback((src: string | null) => {
    setActiveSrc(src);
  }, []);

  const handleError = useCallback(() => {
    alert("Станция недоступна");
  }, []);

  // =========================
  // FILTERING & PAGINATION
  // =========================
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

  // =========================
  // RENDER
  // =========================
  return (
    <section className="flex gap-6 p-6">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:block w-56 glass-effect rounded-xl p-4">
        <h3 className="text-lg mb-2">🌍 Country</h3>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg p-2 text-white"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <h4 className="text-md mb-2">🎶 Genres</h4>
        <div className="flex flex-col gap-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setStationFilter(filter)}
              className={`text-left px-2 py-1 rounded-md transition ${
                stationFilter === filter
                  ? "bg-purple-500 text-white"
                  : "text-white/70 hover:bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </aside>

      {/* ================= STATIONS GRID ================= */}
      <div className="flex-1">
        {currentStations.length === 0 ? (
          <p className="text-white/60">No stations found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStations.map((station) => {
              const shortName =
                station.name.length > 36
                  ? station.name.slice(0, 36) + "…"
                  : station.name;

              const isPlaying = activeSrc === station.url_resolved;

              return (
                <div key={station.stationuuid} className="space-y-2">
                  <StationCard
                    name={shortName}
                    country={station.country}
                    image={station.favicon || defaultImage}
                    genres={[stationFilter !== "all" ? stationFilter : "radio"]}
                    playing={isPlaying}
                    favorite={false}
                    onPlay={() =>
                      handlePlay(isPlaying ? null : station.url_resolved)
                    }
                    onFavorite={() =>
                      console.log("favorite", station.stationuuid)
                    }
                  />

                  <CustomAudioPlayer
                    src={station.url_resolved}
                    isActive={isPlaying}
                    onPlay={handlePlay}
                    onError={handleError}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {filteredStations.length > stationsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="btn-outline-premium disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-white/70">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-outline-premium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
