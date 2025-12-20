import { cva } from "class-variance-authority";

export const textVariants = cva("leading-relaxed", {
  variants: {
    size: {
      body: "text-base",
      sm: "text-sm",
      xs: "text-xs",
      label: "text-sm font-medium",
      helper: "text-xs",
    },
    variant: {
      default: "text-white",
      muted: "text-white/60",
      subtle: "text-white/40",
      error: "text-red-400",
      success: "text-green-400",
    },
  },
  defaultVariants: {
    size: "body",
    variant: "default",
  },
});
