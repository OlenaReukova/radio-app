import { Play, Pause, SkipForward } from "lucide-react";
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
    <div className="flex items-center gap-2 md:gap-3">
      <FavoriteButton
        active={isFavorite}
        onToggle={() => onFavoriteToggle?.()}
        size="icon-sm"
      />

      <Button
        aria-label={playing ? "Pause" : "Play"}
        onClick={onPlayPause}
        variant="primary"
        size="icon"
        className="!w-12 !h-12 md:!w-14 md:!h-14 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
      >
        {playing ? (
          <Pause className="w-5 h-5 md:w-6 md:h-6 fill-current" />
        ) : (
          <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5 md:ml-1 fill-current" />
        )}
      </Button>

      {hasQueue && (
        <Button
          aria-label="Next in queue"
          onClick={onNext}
          variant="ghost"
          size="icon"
          className="hidden md:flex"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
