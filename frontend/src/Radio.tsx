import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import defaultImage from "./radio.avif";
import { StationCard } from "./components/organisms/StationCard";
import type { PlayerStatus, PlayerStation } from "./lib/player/radioPlayer.types";

type Station = {
  stationuuid: string;
  name: string;
  country: string;
  favicon?: string;
  url_resolved: string;
};

type RadioLayoutContext = {
  stationFilter: string;
  selectedCountry: string;
  setCountries: (countries: string[]) => void;
};

type PlayerOutletContext = {
  player: {
    currentSrc: string | null;
    status: PlayerStatus;
    toggle: (station: PlayerStation) => void;
  };
};

export default function Radio() {
  const { stationFilter, selectedCountry, setCountries, player } =
    useOutletContext<RadioLayoutContext & PlayerOutletContext>();

  const [stations, setStations] = useState<Station[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const stationsPerPage = 20;

  useEffect(() => {
    setupApi(stationFilter, selectedCountry).then((data) => {
      setStations(data);

      const uniqueCountries = [
        ...new Set(
          data
            .map((s) => s.country)
            .filter((c) => c && c.trim() !== "")
            .sort(),
        ),
      ];

      setCountries(["All countries", ...uniqueCountries]);
      setCurrentPage(1);
    });
  }, [stationFilter, selectedCountry, setCountries]);

  useEffect(() => {
    if (player.status === "error") {
      alert("Станция недоступна");
    }
  }, [player.status]);

  async function setupApi(filter: string, country: string): Promise<Station[]> {
    try {
      const baseUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5001";

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
  }

  const filteredStations = stations.filter((station) => {
    if (selectedCountry === "All countries") return true;
    return station.country === selectedCountry;
  });

  const totalPages = Math.ceil(filteredStations.length / stationsPerPage);
  const startIndex = (currentPage - 1) * stationsPerPage;
  const currentStations = filteredStations.slice(
    startIndex,
    startIndex + stationsPerPage,
  );

  return (
    <section className="p-6">
      <div className="flex-1">
        {currentStations.length === 0 ? (
          <p className="text-white/60">No stations found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentStations.map((station) => {
              const trimmedName = station.name.trim();
              const shortName =
                trimmedName.length > 36
                  ? trimmedName.slice(0, 36) + "…"
                  : trimmedName;

              return (
                <StationCard
                  key={station.stationuuid}
                  name={shortName}
                  country={station.country}
                  image={station.favicon || defaultImage}
                  genres={[stationFilter !== "all" ? stationFilter : "radio"]}
                  favorite={false}
                  playing={player.currentSrc === station.url_resolved}
                  onPlay={() =>
                    player.toggle({
                      ...station,
                      name: trimmedName,
                      favicon: station.favicon || defaultImage,
                      genres: [stationFilter !== "all" ? stationFilter : "radio"],
                    })
                  }
                  onFavorite={() =>
                    console.log("favorite", station.stationuuid)
                  }
                />
              );
            })}
          </div>
        )}

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
