//this component is a loading skeletion for the table. this will be displayed instead of a blank screen
//when table is loading data

import { Skeleton } from "../ui/skeleton";

export function DataTableLoading() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton className="h-10 w-full" />
      ))}
    </div>
  );
}
