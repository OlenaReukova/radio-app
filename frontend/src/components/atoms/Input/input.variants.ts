import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  [
    "flex w-full min-w-0 outline-none transition-all",
    "text-white placeholder-purple-300/40",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50",
  ].join(" "),
);
export type InputVariants = VariantProps<typeof inputVariants>;
