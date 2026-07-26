//this component is for table pagination

import { Button } from "../ui/button";

//pagination types available to only this file
interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
}

export function DataTablePagination({
  page,
  pageSize,
  total,
  onPrevious,
  onNext,
  canPrevious,
  canNext,
}: Props) {
  return (
    <div className="flex items-center justify-between border-t px-4 py-4">
      <div className="text-sm text-muted-foreground">
        showing {page * pageSize + 1} - {Math.min((page + 1) * pageSize, total)}{" "}
        of {total}
      </div>
      <div className="space-x-2">
        <Button variant="outline" size="sm" onClick={onPrevious} disabled={!canPrevious}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={onNext} disabled={!canNext}>
          Previous
        </Button>
      </div>
    </div>
  );
}
