import * as React from "react";
import { cn } from "../components/ui/utils";

export function PageShell({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        "pt-[var(--header-height)] pb-[calc(var(--player-height)+var(--mobile-safe-area-bottom))]",
        className
      )}
      {...props}
    />
  );
}
