import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { tagVariants } from "./tag.variants";

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}
