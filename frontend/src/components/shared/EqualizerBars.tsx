import { cva } from "class-variance-authority";
import { cn } from "@/components/ui/utils";
import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

export const equalizerBarsVariants = cva("flex items-end", {
  variants: {
    size: {
      sm: "h-3 gap-[1.5px]",
      md: "h-4 gap-[2px]",
      lg: "h-6 gap-[3px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const equalizerBarVariants = cva(
  "h-full rounded-full bg-gradient-to-t from-[#935CFF] to-[#E054FF] origin-bottom",
  {
    variants: {
      size: {
        sm: "w-[2px]",
        md: "w-[3px]",
        lg: "w-[4px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface EqualizerBarsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof equalizerBarsVariants> {
  playing: boolean;
}

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
