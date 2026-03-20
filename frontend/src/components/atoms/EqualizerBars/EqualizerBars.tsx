import { cn } from "../../ui/utils";
import {
  equalizerBarsVariants,
  equalizerBarVariants,
} from "./equalizerBars.variants";
import type { EqualizerBarsProps } from "./EqualizerBars.types";

const DELAYS = ["0s", "0.15s", "0.3s", "0.15s"];

export function EqualizerBars({
  playing,
  size,
  className,
  ...props
}: EqualizerBarsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(equalizerBarsVariants({ size }), className)}
      {...props}
    >
      {DELAYS.map((delay, i) => (
        <div
          key={i}
          className={cn(
            equalizerBarVariants({ size }),
            "transition-transform duration-300",
            playing && "animate-equalizer",
          )}
          style={{
            animationDelay: delay,
            ...(!playing && { transform: "scaleY(0.5)" }),
          }}
        />
      ))}
    </div>
  );
}
