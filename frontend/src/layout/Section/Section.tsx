import * as React from "react";
import { cn } from "../../components/ui/utils";
import { sectionVariants } from "./section.variants";
import type { SectionProps } from "./section.types";

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = "section",
      spacing,
      padded,
      withDivider,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(sectionVariants({ spacing, padded }), className)}
        {...props}
      >
        {withDivider && <div className="divider-gradient mb-8 md:mb-12" />}
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";
