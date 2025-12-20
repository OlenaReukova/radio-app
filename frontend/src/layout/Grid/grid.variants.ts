import { cva } from "class-variance-authority";

export const gridVariants = cva("grid", {
  variants: {
    type: {
      autoFit: "grid-auto-fit",
      autoFill: "grid-auto-fill",
    },
  },
  defaultVariants: {
    type: "autoFit",
  },
});
