import * as React from "react";
import { cn } from "../../ui/utils";
import { tagVariants } from "./tag.variants";
import type { TagProps } from "./tag.types";

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Tag.displayName = "Tag";
