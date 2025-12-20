import { cva } from "class-variance-authority";

export const iconVariants = cva("shrink-0 transition-colors", {
  variants: {
    size: {
      xs: "w-3 h-3", // 12
      sm: "w-4 h-4", // 16
      md: "w-5 h-5", // 20
      lg: "w-6 h-6", // 24
      xl: "w-8 h-8", // 32
    },
    state: {
      default: "text-white",
      muted: "text-white/50",
      active: "text-purple-400",
      danger: "text-red-500",
    },
    interactive: {
      true: "hover:text-purple-300 active:text-purple-500 cursor-pointer",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
    interactive: false,
  },
});
