import { CleanHeader } from "../../organisms/Header/CleanHeader";
import { Outlet } from "react-router-dom";
import { RadioSidebar } from "../../organisms/SidebarNav/RadioSidebar";
import { useState, useEffect } from "react";
import {
  RadioPlayerProvider,
  useRadioPlayerContext,
} from "../../../lib/player/RadioPlayerContext";
import { PlayerBar } from "../../organisms/PlayerBar/PlayerBar";
import { ExpandedMobilePlayer } from "../../organisms/ExpandedMobilePlayer";

function AppLayoutContent() {
  const [stationFilter, setStationFilter] = useState("all");
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All countries");
  const [expandedPlayer, setExpandedPlayer] = useState(false);
  const player = useRadioPlayerContext();

  useEffect(() => {
    if (player.status === "idle" || player.status === "paused") {
      setExpandedPlayer(false);
    }
  }, [player.status]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && window.innerWidth < 768) setExpandedPlayer(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CleanHeader
        searchQuery=""
        onSearchChange={() => {}}
        onToggleFilters={() => {}}
        isFiltersOpen={false}
        currentUser={null}
        onSignIn={() => {}}
        onSignUp={() => {}}
      />

      <div className="flex pt-[72px] gap-6 px-6">
        <RadioSidebar
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          filters={filters}
          activeFilter={stationFilter}
          onFilterChange={setStationFilter}
        />

        <main className="flex-1 pb-[140px] md:pb-[72px]">
          <Outlet
            context={{
              stationFilter,
              selectedCountry,
              setCountries,
              player,
            }}
          />
        </main>
      </div>

      <PlayerBar
        status={player.status}
        station={player.currentStation}
        onPlayPause={() => player.stop()}
        volume={player.volume}
        onVolumeChange={player.setVolume}
        onExpand={() => setExpandedPlayer(true)}
      />

      <ExpandedMobilePlayer
        open={expandedPlayer}
        onClose={() => setExpandedPlayer(false)}
        status={player.status}
        station={player.currentStation}
        volume={player.volume}
        onPlayPause={() => player.stop()}
        onVolumeChange={player.setVolume}
      />
    </div>
  );
}

export function AppLayout() {
  return (
    <RadioPlayerProvider>
      <AppLayoutContent />
    </RadioPlayerProvider>
  );
}
