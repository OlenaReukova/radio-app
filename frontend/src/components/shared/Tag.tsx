import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/components/ui/utils";
import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

export const tagVariants = cva(
  "inline-flex items-center whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        genre: "tag-genre",
        country: "tag-country",
        neutral:
          "px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-white/70 border border-white/10",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Tag.displayName = "Tag";
