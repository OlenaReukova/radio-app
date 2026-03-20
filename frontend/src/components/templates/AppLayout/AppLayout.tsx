import { CleanHeader } from "../../organisms/Header/CleanHeader";
import { Outlet } from "react-router-dom";
import { RadioSidebar } from "../../organisms/SidebarNav/RadioSidebar";
import { useState } from "react";
import {
  RadioPlayerProvider,
  useRadioPlayerContext,
} from "../../../lib/player/RadioPlayerContext";
import { PlayerBar } from "../../organisms/PlayerBar/PlayerBar";

function AppLayoutContent() {
  const [stationFilter, setStationFilter] = useState("all");
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All countries");
  const player = useRadioPlayerContext();

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

        <main className="flex-1">
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
