import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { containerVariants } from "./container.variants";

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}
