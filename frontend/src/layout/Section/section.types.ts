import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { sectionVariants } from "./section.variants";

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
  withDivider?: boolean;
}
