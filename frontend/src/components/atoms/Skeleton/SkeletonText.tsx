import { Skeleton } from "./Skeleton";

export function SkeletonText({ width = "w-full" }: { width?: string }) {
  return <Skeleton className={`h-3 ${width}`} />;
}
