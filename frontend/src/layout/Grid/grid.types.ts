import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { gridVariants } from "./grid.variants";

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}
