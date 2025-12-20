import { cva } from "class-variance-authority";

export const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      sm: "max-w-screen-sm px-4",
      md: "max-w-screen-md px-4 md:px-6",
      lg: "max-w-screen-lg px-4 md:px-6 lg:px-8",
      xl: "container-premium",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});
