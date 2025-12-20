import { cn } from "../../ui/utils";
import { textVariants } from "./text.variants";
import type { TextProps } from "./text.types";

export const Text = ({
  as = "p",
  size,
  variant,
  className,
  ...props
}: TextProps) => {
  const Component = as;

  return (
    <Component
      className={cn(textVariants({ size, variant }), className)}
      {...props}
    />
  );
};
