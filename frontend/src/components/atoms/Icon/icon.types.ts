import type { LucideIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import type { iconVariants } from "./icon.variants";

export interface IconProps extends VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  className?: string;
  "aria-hidden"?: boolean;
}
