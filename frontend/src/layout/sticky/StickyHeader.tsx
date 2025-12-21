import * as React from "react";
import { cn } from "../../components/ui/utils";

export const StickyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-0",
      "z-[var(--z-header)]",
      "glass-effect backdrop-blur-md",
      className
    )}
    {...props}
  />
));

StickyHeader.displayName = "StickyHeader";
