import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { inlineVariants } from "./inline.variants";

export interface InlineProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineVariants> {
  as?: React.ElementType;
}
