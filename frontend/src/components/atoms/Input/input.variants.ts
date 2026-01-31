import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full min-w-0 outline-none transition-all",
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
