import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export type SkeletonType = "table" | "card" | "avatar" | "text" | "form";

interface SkeletonTypeProps {
  skeletonType: SkeletonType;
}

export function Skeletons({ skeletonType }: SkeletonTypeProps) {
  switch (skeletonType) {
    case "table":
      return (
        <div className="w-full overflow-hidden">
          <div className="flex w-full min-w-[700px] flex-col gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex w-full items-center gap-4" key={index}>
                {/* Name */}
                <div className="flex min-w-[200px] flex-1 items-center gap-4">
                  <Skeleton className="size-10 shrink-0 rounded-full" />

                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                </div>

                {/* Columns */}
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      );

    case "card":
      return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card className="w-full ring-0" key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );

    case "avatar":
      return (
        <div className="flex w-fit items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />

          <div className="grid gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      );

    case "form":
      return (
        <div className="flex w-full max-w-xs flex-col gap-7">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>

          <Skeleton className="h-8 w-24" />
        </div>
      );

    case "text":
      return (
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      );

    default:
      return null;
  }
}
