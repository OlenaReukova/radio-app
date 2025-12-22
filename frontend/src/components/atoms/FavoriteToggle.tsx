import { Heart } from "lucide-react";
import { cn } from "../ui/utils";

interface FavoriteToggleProps {
  active?: boolean;
  onToggle?: () => void;
}

export function FavoriteToggle({ active, onToggle }: FavoriteToggleProps) {
  return (
    <button
      aria-pressed={active}
      aria-label="Toggle favorite"
      onClick={onToggle}
      className={cn("icon-button", active && "text-pink-400")}
    >
      <Heart className={cn("w-4 h-4", active && "fill-current")} />
    </button>
  );
}
