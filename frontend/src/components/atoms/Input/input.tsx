import * as React from "react";
import { type InputProps } from "./input.types";
import { cn } from "../../ui/utils";
import { inputVariants } from "./input.variants";
import { Input as UIInput } from "../../ui/input";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, scale, shape, state, ...props }, ref) => {
    return (
      <UIInput
        ref={ref}
        className={cn(
          inputVariants({ variant, scale, shape, state }),
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
