import * as React from "react";
import { cn } from "../../components/ui/utils";
import { containerVariants } from "./container.variants";
import type { ContainerProps } from "./container.types";

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
