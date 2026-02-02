import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        glass:
          "px-3 py-2.5 rounded-xl " +
          "bg-white/5 border border-white/10 text-purple-200/70 " +
          "hover:bg-white/10 hover:border-purple-500/30 hover:scale-105 " +
          "active:scale-95",

        primary:
          "px-6 py-3 rounded-full text-white " +
          "bg-gradient-to-r from-purple-500 to-pink-500 " +
          "hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 " +
          "active:scale-95",

        active:
          "px-3 py-2.5 rounded-xl text-white " +
          "bg-gradient-to-r from-[#E054FF] to-[#935CFF] " +
          "shadow-[0_0_12px_rgba(224,84,255,0.35)] " +
          "hover:scale-105",

        destructive:
          "px-3 py-2.5 rounded-xl " +
          "bg-white/5 border border-white/10 text-purple-200/70 " +
          "hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 " +
          "hover:scale-105 active:scale-95",

        ghost:
          "px-3 py-2.5 rounded-xl text-purple-200/70 " +
          "hover:bg-white/5 hover:text-white",

        cta:
          "bg-gradient-to-r from-purple-500 to-pink-500 " +
          "text-white rounded-full hover:shadow-lg " +
          "hover:shadow-purple-500/50 hover:scale-105",
      },

      size: {
        xs: "text-xs px-2 py-1.5 rounded-lg",
        sm: "text-sm px-3 py-2",
        md: "text-sm md:text-base px-3 md:px-5 py-2 md:py-2.5",
        lg: "text-lg px-6 py-3",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "glass",
      size: "md",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
