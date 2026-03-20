import { cva } from "class-variance-authority";

export const albumArtVariants = cva(
  "relative overflow-hidden rounded-lg shrink-0",
  {
    variants: {
      size: {
        sm: "w-10 h-10",
        md: "w-16 h-16",
        lg: "w-[120px] h-[120px]",
      },
      glow: {
        true: "shadow-[0_0_24px_rgba(224,84,255,0.4)]",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      glow: false,
    },
  },
);
