import * as React from "react";
import { cn } from "../../components/ui/utils";

export const StickyBottom = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed bottom-0 left-0 right-0",
      "z-[var(--z-bottom-nav)]",
      "glass-dark",
      className
    )}
    {...props}
  />
));

StickyBottom.displayName = "StickyBottom";
