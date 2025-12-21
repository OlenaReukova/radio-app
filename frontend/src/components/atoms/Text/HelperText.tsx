import * as React from "react";
import { cn } from "../../ui/utils";

export const HelperText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xs text-purple-200/60 mt-1", className)}
      {...props}
    />
  );
});

HelperText.displayName = "HelperText";
