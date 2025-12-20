import { cva } from "class-variance-authority";

export const cardVariants = cva("transition-all duration-300", {
  variants: {
    variant: {
      static: "card-premium",
      interactive: "card-interactive hover-lift",
      clickable: "card-interactive hover-lift cursor-pointer",
    },
    padding: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "static",
    padding: "md",
  },
});
