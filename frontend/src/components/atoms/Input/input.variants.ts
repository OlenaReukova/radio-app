import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  [
    //Base
    "flex w-full min-w-0 outline-none transition-all",
    //Typography
    "text-white placeholder:text-purple-300/40",
    // Interaction
    "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50",

    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        glass: "bg-white/5 border border-white/10",
      },

      scale: {
        sm: "py-2 px-3 text-sm rounded-xl",
        md: "py-3 px-4 text-base rounded-xl",
      },

      shape: {
        default: "",
        pill: "rounded-full",
      },

      state: {
        default: "",
        error: "border-red-500/50",
        success: "border-green-500/50",
      },
    },

    defaultVariants: {
      variant: "glass",
      scale: "md",
      shape: "default",
      state: "default",
    },
  },
);
export type InputVariants = VariantProps<typeof inputVariants>;
