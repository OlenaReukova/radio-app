import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { equalizerBarsVariants } from "./equalizerBars.variants";

export interface EqualizerBarsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof equalizerBarsVariants> {
  playing: boolean;
}
