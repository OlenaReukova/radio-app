import * as React from "react";
import { cn } from "../../components/ui/utils";
import { stackVariants } from "./stack.variants";
import type { StackProps } from "./stack.types";

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = "div",
      direction,
      gap,
      align,
      justify,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, gap, align, justify }),
          className
        )}
        {...props}
      />
    );
  }
);

Stack.displayName = "Stack";
