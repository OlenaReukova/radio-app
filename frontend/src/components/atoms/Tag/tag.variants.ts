import { cva } from "class-variance-authority";

export const tagVariants = cva(
  "inline-flex items-center whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        genre: "tag-genre",
        country: "tag-country",
        neutral:
          "px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-white/70 border border-white/10",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);
