import * as React from "react";
import { cn } from "../../components/ui/utils";
import { gridVariants } from "./grid.variants";
import type { GridProps } from "./grid.types";

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ type, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ type }), className)}
      {...props}
    />
  )
);

Grid.displayName = "Grid";
