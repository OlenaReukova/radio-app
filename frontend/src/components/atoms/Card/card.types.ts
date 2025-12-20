import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { cardVariants } from "./card.variants";

type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export interface CardProps
  extends NativeDivProps,
    VariantProps<typeof cardVariants> {
  loading?: boolean;
}
