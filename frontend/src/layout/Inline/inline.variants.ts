import { cva } from "class-variance-authority";

export const inlineVariants = cva("flex flex-row", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    gap: "md",
    wrap: "nowrap",
    align: "center",
    justify: "start",
  },
});
