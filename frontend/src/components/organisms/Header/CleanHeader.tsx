import { Button } from "../../atoms/Button";
import { SearchInput } from "../../molecules/SearchInput/SearchInput";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "../../ui/utils";
import { AccountMenu } from "../../molecules/AccountMenu";

interface CleanHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
  activeFiltersCount?: number;
  currentUser: null | {
    id: string;
    name: string;
    email: string;
  };
  onSignIn: () => void;
  onSignUp: () => void;
}

export function CleanHeader({
  searchQuery,
  onSearchChange,
  onToggleFilters,
  isFiltersOpen,
  activeFiltersCount,
  currentUser,
  onSignIn,
  onSignUp,
}: CleanHeaderProps) {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-[100]
        px-3
        md:px-6
        py-3
        md:py-4
        bg-[#1F1529]/80
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >
      <div className="h-full px-4 md:px-6">
        <div className="flex items-center  ">
          <div className="flex items-center gap-2 px-3">
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
              {activeFiltersCount && activeFiltersCount > 0 && (
                <span
                  className="
        absolute -top-1 -right-1
        min-w-[18px] h-[18px]
        px-1
        flex items-center justify-center
        text-[10px] font-medium
        rounded-full
        bg-purple-500 text-white
      "
                >
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
          <div className="flex-1 max-w-2xl mx-auto">
            <SearchInput
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="text-sm sm:text-base"
            />
          </div>
          {!currentUser && (
            <div className="flex items-center gap-2 ">
              <Button
                type="button"
                onClick={onSignIn}
                variant="ghost"
                size="md"
              >
                Sign In
              </Button>
              <Button type="button" onClick={onSignUp} variant="cta" size="md">
                Sign Up
              </Button>
            </div>
          )}
          {currentUser && <AccountMenu user={currentUser} />}
        </div>
      </div>
    </header>
  );
}
