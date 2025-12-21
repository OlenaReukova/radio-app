import * as React from "react";
import { cn } from "../../ui/utils";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn("block text-sm text-white/90 mb-1", className)}
      {...props}
    />
  );
});

Label.displayName = "Label";
