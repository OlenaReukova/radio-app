//4 React component
import { forwardRef } from "react";
import { Button as BaseButton } from "../../ui/button";
import { cn } from "../../ui/utils";

import type { ButtonProps } from "./button.types";
import { buttonVariants } from "./button.variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, loading, className, children, disabled, ...props },
    ref
  ) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? <span className="spinner spinner-sm" /> : children}
      </BaseButton>
    );
  }
);

Button.displayName = "Button";
