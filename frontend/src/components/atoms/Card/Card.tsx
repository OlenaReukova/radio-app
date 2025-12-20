import * as React from "react";
import { Card as BaseCard } from "../../ui/card";
import { cn } from "../../ui/utils";
import { cardVariants } from "./card.variants";
import type { CardProps } from "./card.types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, loading, children, ...props }, ref) => {
    return (
      <BaseCard
        ref={ref}
        className={cn(
          cardVariants({ variant, padding }),
          loading && "skeleton",
          className
        )}
        aria-busy={loading}
        {...props}
      >
        {children}
      </BaseCard>
    );
  }
);

Card.displayName = "Card";
