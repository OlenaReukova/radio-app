import { ChevronUp } from "lucide-react";
import { cn } from "../../ui/utils";
import { GenreTagGroup } from "../../atoms/GenreTagGroup";
import { AlbumArt } from "../../atoms/AlbumArt";
import { EqualizerBars } from "../../atoms/EqualizerBars";
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
  const isPlaying = status === "playing";

  return (
    <div
      className={cn(
        "fixed bottom-16 md:bottom-6 left-0 md:left-24 right-0 md:right-6 z-50",
        "transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full pointer-events-none",
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#1F1529]/95 via-[#2B2038]/95 to-[#1F1529]/95 backdrop-blur-xl border-t md:border border-white/10 md:rounded-2xl shadow-2xl shadow-black/50 p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-6">

            <div
              className="flex items-center gap-2 md:gap-4 flex-1 min-w-0 cursor-pointer md:cursor-auto active:opacity-70 md:active:opacity-100 transition-opacity"
              onClick={() => {
                if (onExpand && window.innerWidth < 768) {
                  onExpand();
                }
              }}
            >
              <div className="relative group shrink-0">
                <AlbumArt
                  src={station?.favicon}
                  alt={station?.name ?? "Station"}
                  size="md"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <EqualizerBars playing size="sm" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm md:text-base font-medium truncate mb-0.5 md:mb-1">
                  {station?.name}
                </h3>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-purple-300/70">
                  <span className="truncate">{station?.country}</span>
                  {station?.genres && station.genres.length > 0 && (
                    <>
                      <span className="hidden md:inline">•</span>
                      <span className="truncate hidden md:inline">
                        <GenreTagGroup genres={station.genres} variant="inline" />
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ChevronUp className="w-4 h-4 text-purple-300/50 shrink-0 md:hidden" />
            </div>

            <MiniPlayerControls
              playing={isPlaying}
              onPlayPause={onPlayPause}
              onNext={onNext}
              hasQueue={hasQueue}
              isFavorite={isFavorite}
              onFavoriteToggle={onFavoriteToggle}
            />

            <div className="hidden md:flex items-center gap-3">
              <VolumeControl
                volume={volume}
                onVolumeChange={onVolumeChange}
                orientation="popover"
              />

              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400",
                  )}
                />
                <span className="text-xs text-purple-300">
                  {isPlaying ? "Live" : "Paused"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
