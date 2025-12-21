import * as React from "react";
import { cn } from "../../components/ui/utils";

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "darker";
  onClick?: () => void;
}

export function Overlay({
  variant = "dark",
  className,
  onClick,
  ...props
}: OverlayProps) {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={cn(
        "fixed inset-0 z-[120] backdrop-blur-sm",
        variant === "light" && "bg-black/40",
        variant === "dark" && "bg-black/60",
        variant === "darker" && "bg-black/70",
        className
      )}
      {...props}
    />
  );
}
