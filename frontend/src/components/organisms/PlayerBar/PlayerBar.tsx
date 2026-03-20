import { ChevronUp } from "lucide-react";
import { cn } from "../../ui/utils";
import { AlbumArt } from "../../atoms/AlbumArt";
import { EqualizerBars } from "../../atoms/EqualizerBars";
import { GenreTagGroup } from "../../atoms/GenreTagGroup";
import { MiniPlayerControls } from "../../molecules/MiniPlayerControls";
import { VolumeControl } from "../../molecules/VolumeControl";
import type { PlayerBarProps } from "./PlayerBar.types";

export function PlayerBar({
  status,
  station,
  volume,
  onPlayPause,
  onVolumeChange,
  onNext,
  hasQueue = false,
  isFavorite = false,
  onFavoriteToggle,
  onExpand,
}: PlayerBarProps) {
  const visible = status !== "idle";

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40",
        "bottom-16 md:bottom-0",
        "transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full pointer-events-none",
      )}
    >
      <div className="bg-white/5 backdrop-blur-md border-t border-white/10 rounded-t-2xl px-4 py-3">
        <div className="flex items-center gap-3 max-w-screen-xl mx-auto">

          {/* Station info — tappable on mobile to expand */}
          <div
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer md:cursor-auto"
            onClick={onExpand}
            role={onExpand ? "button" : undefined}
            aria-label={onExpand ? "Expand player" : undefined}
          >
            <AlbumArt
              src={station?.favicon}
              alt={station?.name ?? "Station"}
              size="sm"
            />

            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">
                {station?.name}
              </p>
              <p className="text-white/50 text-xs truncate">{station?.country}</p>
              <div className="hidden sm:block mt-0.5">
                <GenreTagGroup genres={station?.genres.slice(0, 2) ?? []} />
              </div>
            </div>

            <ChevronUp className="w-4 h-4 text-white/40 shrink-0 md:hidden" />
          </div>

          {/* Equalizer — hidden on very small screens */}
          <EqualizerBars
            playing={status === "playing"}
            size="md"
            className="hidden sm:flex"
          />

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <MiniPlayerControls
              playing={status === "playing"}
              onPlayPause={onPlayPause}
              onNext={onNext}
              hasQueue={hasQueue}
              isFavorite={isFavorite}
              onFavoriteToggle={onFavoriteToggle}
            />

            {/* Desktop: full slider */}
            <div className="hidden md:flex w-32">
              <VolumeControl
                volume={volume}
                onVolumeChange={onVolumeChange}
                orientation="horizontal"
              />
            </div>

            {/* Mobile: mute icon only */}
            <div className="md:hidden">
              <VolumeControl
                volume={volume}
                onVolumeChange={onVolumeChange}
                orientation="compact"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
