import { cva } from "class-variance-authority";

export const inputVariants = cva("input-premium w-full transition-all", {
  variants: {
    variant: {
      default: "",
      search: "pl-10",
      error: "border-red-500 focus:border-red-500",
    },
    size: {
      sm: "h-8 text-sm px-3",
      md: "h-10 text-base px-4",
      lg: "h-12 text-lg px-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
