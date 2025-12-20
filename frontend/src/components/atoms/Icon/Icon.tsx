import { cn } from "../../ui/utils";
import { iconVariants } from "./icon.variants";
import type { IconProps } from "./icon.types";

export const Icon = ({
  icon: IconComponent,
  size,
  state,
  interactive,
  className,
  ...props
}: IconProps) => {
  return (
    <IconComponent
      className={cn(iconVariants({ size, state, interactive }), className)}
      {...props}
    />
  );
};
