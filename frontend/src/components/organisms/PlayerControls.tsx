import { Play, Pause, SkipForward } from "lucide-react";

interface PlayerControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
}

export function PlayerControls({
  playing,
  onPlayPause,
  onNext,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        aria-label={playing ? "Pause" : "Play"}
        onClick={onPlayPause}
        className="btn-play"
      >
        {playing ? (
          <Pause className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 ml-0.5 fill-current" />
        )}
      </button>

      {onNext && (
        <button
          aria-label="Next station"
          onClick={onNext}
          className="icon-button"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
