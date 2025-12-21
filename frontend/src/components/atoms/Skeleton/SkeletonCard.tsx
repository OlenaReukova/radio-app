import { Skeleton } from "./Skeleton";

export function SkeletonCard() {
  return (
    <div className="card-premium p-4 space-y-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}
