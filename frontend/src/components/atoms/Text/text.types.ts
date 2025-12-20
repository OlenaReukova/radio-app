import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { textVariants } from "./text.variants";

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "label" | "div";
}
