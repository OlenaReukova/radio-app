import React from "react";
import { cn } from "../../components/ui/utils";
import { inlineVariants } from "./inline.variants";
import type { InlineProps } from "./inline.types";

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  (
    { as: Component = "div", gap, wrap, align, justify, className, ...props },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(inlineVariants({ gap, wrap, align, justify }), className)}
      {...props}
    />
  )
);

Inline.displayName = "Inline";
