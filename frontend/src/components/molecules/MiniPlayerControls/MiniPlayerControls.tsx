import { Play, Pause, SkipForward } from "lucide-react";
import { cn } from "../../ui/utils";
import { Button } from "../../atoms/Button/Button";
import { FavoriteButton } from "../../atoms/FavoriteButton";
import type { MiniPlayerControlsProps } from "./MiniPlayerControls.types";

export function MiniPlayerControls({
  playing,
  onPlayPause,
  onNext,
  hasQueue = false,
  isFavorite = false,
  onFavoriteToggle,
}: MiniPlayerControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <FavoriteButton
        active={isFavorite}
        onToggle={onFavoriteToggle ?? (() => {})}
      />

      <Button
        variant="ghost"
        size="icon"
        aria-label={playing ? "Pause" : "Play"}
        onClick={onPlayPause}
      >
        {playing ? (
          <Pause className="w-5 h-5 fill-current text-white" />
        ) : (
          <Play className="w-5 h-5 ml-0.5 fill-current text-white" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Next station"
        onClick={onNext}
        className={cn(!hasQueue && "opacity-50 pointer-events-none")}
      >
        <SkipForward className="w-4 h-4 text-white/70" />
      </Button>
    </div>
  );
}
