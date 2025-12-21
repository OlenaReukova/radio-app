import * as React from "react";
import { cn } from "../../ui/utils";

export const ErrorText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      role="alert"
      className={cn("text-xs text-red-500 mt-1", className)}
      {...props}
    />
  );
});

ErrorText.displayName = "ErrorText";
