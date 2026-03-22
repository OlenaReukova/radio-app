import { cn } from "@/components/ui/utils";

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

export function SkeletonAvatar() {
  return <Skeleton className="w-10 h-10 rounded-full" />;
}

export function SkeletonCard() {
  return (
    <div className="card-premium p-4 space-y-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function SkeletonText({ width = "w-full" }: { width?: string }) {
  return <Skeleton className={`h-3 ${width}`} />;
}
