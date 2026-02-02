import { Button } from "../../atoms/Button";
import { SearchInput } from "../../molecules/SearchInput/SearchInput";
import { SlidersHorizontal } from "lucide-react";

interface CleanHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
}

export function CleanHeader({
  searchQuery,
  onSearchChange,
  onToggleFilters,
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
          aria-label="Toggle filters"
          variant="glass"
          size={"icon-sm"}
        >
          <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
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
