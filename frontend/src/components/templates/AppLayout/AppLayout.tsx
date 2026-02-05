import { CleanHeader } from "../../organisms/Header/CleanHeader";
import { Outlet } from "react-router-dom";
import { RadioSidebar } from "../../organisms/SidebarNav/RadioSidebar";
import { useState } from "react";

// Structural Contract
// Behavioural Contract
// Integration Rules
// Forbidden Patterns
export function AppLayout() {
  const [stationFilter, setStationFilter] = useState("all");
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All countries");

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
        {/* <aside className="hidden md:block w-[80px]">
          <SidebarNav />
        </aside> */}
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
            }}
          />
        </main>
      </div>

      {/* <MobileBottomNav />
      <PlayerBar /> */}
    </div>
  );
}
