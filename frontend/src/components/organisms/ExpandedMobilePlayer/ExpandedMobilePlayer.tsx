import { X, Share2 } from "lucide-react";
import { cn } from "../../ui/utils";
import { AlbumArt } from "../../atoms/AlbumArt";
import { EqualizerBars } from "../../atoms/EqualizerBars";
import { MiniPlayerControls } from "../../molecules/MiniPlayerControls";
import { VolumeControl } from "../../molecules/VolumeControl";
import type { ExpandedMobilePlayerProps } from "./ExpandedMobilePlayer.types";

export function ExpandedMobilePlayer({
  open,
  onClose,
  status,
  station,
  volume,
  onPlayPause,
  onVolumeChange,
  onNext,
  hasQueue = false,
  isFavorite = false,
  onFavoriteToggle,
}: ExpandedMobilePlayerProps) {
  const isPlaying = status === "playing";

  return (
    <div
      className={cn(
        "md:hidden fixed inset-0 z-[110]",
        "bg-gradient-to-b from-[#2B2038] to-[#1a1025]",
        "flex flex-col",
        "transition-[transform,opacity] duration-300",
        open ? "translate-y-0 opacity-100 ease-out" : "translate-y-full opacity-0 pointer-events-none ease-in",
      )}
    >
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button
          onClick={onClose}
          aria-label="Close expanded player"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-white text-sm font-semibold tracking-wide">
          Now Playing
        </span>

        <button
          onClick={() => {}}
          aria-label="Share station"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 px-6 gap-6 overflow-hidden">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <AlbumArt
            src={station?.favicon}
            alt={station?.name ?? "Station"}
            size="lg"
            glow={isPlaying}
            className="w-full h-full rounded-2xl"
          />
          {isPlaying && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <EqualizerBars playing size="md" />
            </div>
          )}
        </div>

        <div className="w-full text-center space-y-1">
          <h2 className="text-white text-xl font-bold truncate">
            {station?.name}
          </h2>
          <p className="text-purple-300/70 text-sm">
            {[station?.country, station?.genres?.join(", ")]
              .filter(Boolean)
              .join(" • ")}
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div
            className={cn(
              "w-2 h-2 rounded-full shrink-0",
              isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400",
            )}
          />
          <span className="text-sm text-white/80">
            {isPlaying ? "Live Broadcasting" : status === "loading" ? "Loading…" : "Paused"}
          </span>
        </div>

        <div className="w-full flex items-center gap-3">
          <VolumeControl
            volume={volume}
            onVolumeChange={onVolumeChange}
            orientation="horizontal"
          />
          <span className="text-sm text-purple-300/70 w-8 text-right shrink-0">
            {Math.round(volume * 100)}
          </span>
        </div>

        <MiniPlayerControls
          playing={isPlaying}
          onPlayPause={onPlayPause}
          onNext={onNext}
          hasQueue={hasQueue}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      </div>
    </div>
  );
}
