import * as React from "react";
import { type InputProps } from "./input.types";
import { cn } from "../../ui/utils";
import { inputVariants } from "./input.variants";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, scale, shape, state, ...props }, ref) => {
    return (
      <input ref={ref} className={cn(inputVariants(), className)} {...props} />
    );
  },
);

Input.displayName = "Input";
