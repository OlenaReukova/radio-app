import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full",
  {
    variants: {
      variant: {
        premium: "badge-premium",
        outline: "badge-outline",
      },
      intent: {
        live: "",
        new: "",
        featured: "",
        count: "",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "premium",
      size: "sm",
    },
  }
);
