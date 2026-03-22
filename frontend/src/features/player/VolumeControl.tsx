import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/components/ui/utils";

export interface VolumeControlProps {
  volume: number;
  onVolumeChange: (v: number) => void;
  orientation?: "horizontal" | "compact" | "popover";
}

const sliderClassName = cn(
  "[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-track]]:h-1",
  "[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-purple-500 [&_[data-slot=slider-range]]:to-pink-500",
  "[&_[data-slot=slider-thumb]]:w-3 [&_[data-slot=slider-thumb]]:h-3",
  "[&_[data-slot=slider-thumb]]:bg-gradient-to-br [&_[data-slot=slider-thumb]]:from-purple-500 [&_[data-slot=slider-thumb]]:to-pink-500",
  "[&_[data-slot=slider-thumb]]:border-0",
);

export function VolumeControl({
  volume,
  onVolumeChange,
  orientation = "horizontal",
}: VolumeControlProps) {
  const premuteVolume = useRef(volume > 0 ? volume : 1);
  const [showSlider, setShowSlider] = useState(false);
  const isMuted = volume === 0;

  function handleMuteToggle() {
    if (isMuted) {
      onVolumeChange(premuteVolume.current);
    } else {
      premuteVolume.current = volume;
      onVolumeChange(0);
    }
  }

  if (orientation === "popover") {
    return (
      <div className="relative">
        <button
          onClick={() => setShowSlider((v) => !v)}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
          aria-label="Volume control"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {showSlider && (
          <div className="absolute bottom-full right-0 mb-2 p-4 bg-[#1F1529]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl">
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={(vals) => onVolumeChange(vals[0])}
              aria-label="Volume"
              className={cn("w-24", sliderClassName)}
            />
          </div>
        )}
      </div>
    );
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
