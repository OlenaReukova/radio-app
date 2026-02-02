import { Button } from "../../atoms/Button";
import { SearchInput } from "../../molecules/SearchInput/SearchInput";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "../../ui/utils";

interface CleanHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
}

export function CleanHeader({
  searchQuery,
  onSearchChange,
  onToggleFilters,
  isFiltersOpen,
}: CleanHeaderProps) {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-[100]
        h-16
        bg-[#1F1529]/80
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >
      <div className="h-full flex items-center px-4 md:px-6 gap-4">
        <Button
          type="button"
          onClick={onToggleFilters}
          aria-label={isFiltersOpen ? "Close Filters" : "Open filters"}
          aria-pressed={isFiltersOpen}
          variant="glass"
          size="icon-sm"
          className={cn(
            "group border transition-all",
            isFiltersOpen
              ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300"
              : "bg-white/5 border-white/10 text-purple-300 hover:bg-white/10 hover:text-white",
          )}
        >
          <SlidersHorizontal
            className={cn(
              "w-4 h-4 md:w-5 md:h-5 transition-transform duration-300",
              isFiltersOpen ? "rotate-90" : "group-hover:rotate-90",
            )}
          />
        </Button>
        <div className="flex-1 max-w-xl">
          <SearchInput
            placeholder="Search stations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
    </header>
  );
}
