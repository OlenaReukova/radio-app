import { cva } from "class-variance-authority";

export const equalizerBarsVariants = cva("flex items-end", {
  variants: {
    size: {
      sm: "h-3 gap-[1.5px]",
      md: "h-4 gap-[2px]",
      lg: "h-6 gap-[3px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const equalizerBarVariants = cva(
  "h-full rounded-full bg-gradient-to-t from-[#935CFF] to-[#E054FF] origin-bottom",
  {
    variants: {
      size: {
        sm: "w-[2px]",
        md: "w-[3px]",
        lg: "w-[4px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
