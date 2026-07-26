// Why this file?

import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The latest shadcn/ui pagination component is intentionally low-level. It doesn't provide enterprise features like:

// Page size selection
// Total records
// First/Last page
// Ellipsis
// "Showing X–Y of Z"
// Server-side pagination support

// For an HMS, we need all of those.

// Instead of forcing everything into WorkspacePagination, I'd create a reusable DataTableFooter that every workspace module can use.

// This will be used by:

// ✅ Visits
// ✅ Medical Records
// ✅ Medications
// ✅ Laboratory
// ✅ Radiology
// ✅ Billing
// ✅ Pharmacy
// ✅ Documents

interface DataTableFooterProps {
  page: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTableFooter({
  page,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}: DataTableFooterProps) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize)); //total number of pages
  const start = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1; //first page
  // const end = Math.min((page = pageSize), totalPages); //last page
  const end = Math.min((page = pageSize), totalRecords); //last page

  return (
    <div className="flex flex-col gap-4 border-t pt-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {start}-{end} of {totalRecords} records
      </div>
      <div className="flex items-center gap-4">
        <SelectTrigger>
          {" "}
          {/**trigger the page number selected */}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>

        <Button
          variant="outline"
          size="icon"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
