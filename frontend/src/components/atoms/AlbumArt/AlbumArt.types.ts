import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { albumArtVariants } from "./albumArt.variants";

export interface AlbumArtProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof albumArtVariants> {
  src?: string;
  alt: string;
}
