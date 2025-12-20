import * as React from "react";
import { cn } from "../../ui/utils";
import { badgeVariants } from "./badge.variants";
import type { BadgeProps } from "./badge.types";

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, intent, size, label, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, intent, size }), className)}
        {...props}
      >
        {label ?? children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
