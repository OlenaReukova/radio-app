import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { stackVariants } from "./stack.variants";

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
}
