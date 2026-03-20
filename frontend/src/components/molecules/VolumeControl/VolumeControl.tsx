import { useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Slider } from "../../ui/slider";
import { cn } from "../../ui/utils";
import type { VolumeControlProps } from "./VolumeControl.types";

export function VolumeControl({
  volume,
  onVolumeChange,
  orientation = "horizontal",
}: VolumeControlProps) {
  const premuteVolume = useRef(volume > 0 ? volume : 1);
  const isMuted = volume === 0;

  function handleMuteToggle() {
    if (isMuted) {
      onVolumeChange(premuteVolume.current);
    } else {
      premuteVolume.current = volume;
      onVolumeChange(0);
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        orientation === "horizontal" && "w-full",
      )}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={isMuted ? "Unmute" : "Mute"}
        onClick={handleMuteToggle}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white/70" />
        ) : (
          <Volume2 className="w-4 h-4 text-white/70" />
        )}
      </Button>

      {orientation === "horizontal" && (
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={(vals) => onVolumeChange(vals[0])}
          aria-label="Volume"
          className={cn(
            "flex-1",
            "[&_[data-slot=slider-track]]:bg-white/20",
            "[&_[data-slot=slider-track]]:h-1.5",
            "[&_[data-slot=slider-range]]:bg-gradient-to-r",
            "[&_[data-slot=slider-range]]:from-[#E054FF]",
            "[&_[data-slot=slider-range]]:to-[#935CFF]",
            "[&_[data-slot=slider-thumb]]:w-3",
            "[&_[data-slot=slider-thumb]]:h-3",
            "[&_[data-slot=slider-thumb]]:bg-[#935CFF]",
            "[&_[data-slot=slider-thumb]]:border-[#935CFF]",
          )}
        />
      )}
    </div>
  );
}
