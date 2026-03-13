import { Card, CardContent } from "../../components/ui/card.jsx";
import { Skeleton } from "../../components/ui/skeleton.jsx";

export default function ProductSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">

      {/* Image Skeleton */}
      <Skeleton className="h-60 w-full" />

      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-6 w-28" />
      </CardContent>

    </Card>
  );
}