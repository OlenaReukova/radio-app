import { cn } from "../../ui/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("animate-pulse rounded-xl bg-white/10", className)}
    />
  );
}
