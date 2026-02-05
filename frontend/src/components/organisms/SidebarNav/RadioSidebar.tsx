interface RadioSidebarProps {
  countries: string[];
  selectedCountry: string;
  onCountryChange: (value: string) => void;

  filters: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export function RadioSidebar({
  countries,
  selectedCountry,
  onCountryChange,
  filters,
  activeFilter,
  onFilterChange,
}: RadioSidebarProps) {
  return (
    <aside className="hidden md:block w-56 glass-effect rounded-xl p-4">
      <h3 className="text-lg mb-2">🌍 Country</h3>

      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
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
            onClick={() => onFilterChange(filter)}
            className={`text-left px-2 py-1 rounded-md transition ${
              activeFilter === filter
                ? "bg-purple-500 text-white"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </aside>
  );
}
