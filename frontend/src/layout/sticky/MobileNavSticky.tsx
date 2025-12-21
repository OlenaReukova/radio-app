import * as React from "react";
import { cn } from "../../components/ui/utils";

export const MobileNavSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed bottom-0 left-0 right-0 md:hidden",
      "z-[var(--z-bottom-nav)]",
      "glass-effect border-t border-white/10",
      "mobile-safe-area-bottom",
      className
    )}
    {...props}
  />
));

MobileNavSticky.displayName = "MobileNavSticky";
