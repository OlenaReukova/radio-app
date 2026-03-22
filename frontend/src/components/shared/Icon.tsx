import { cva } from "class-variance-authority";
import { cn } from "@/components/ui/utils";
import type { LucideIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

export const iconVariants = cva("shrink-0 transition-colors", {
  variants: {
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    },
    state: {
      default: "text-white",
      muted: "text-white/50",
      active: "text-purple-400",
      danger: "text-red-500",
    },
    interactive: {
      true: "hover:text-purple-300 active:text-purple-500 cursor-pointer",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
    interactive: false,
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  className?: string;
  "aria-hidden"?: boolean;
}

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
