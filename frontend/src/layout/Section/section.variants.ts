import { cva } from "class-variance-authority";

export const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-6 md:py-8",
      md: "py-10 md:py-14",
      lg: "py-14 md:py-20",
      xl: "py-20 md:py-28",
    },
    padded: {
      true: "px-4 md:px-6 lg:px-0",
      false: "",
    },
  },
  defaultVariants: {
    spacing: "md",
    padded: true,
  },
});
