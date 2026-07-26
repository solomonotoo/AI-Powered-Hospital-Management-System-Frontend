import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableSortHeader } from "@/features/shared-features/data-table-sort-header";
import { SortState } from "@/features/types/sort-state";
import React from "react";

interface FacilityTableHeaderProps {
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}

export default function FacilityTableHeader({
  sort,
  onSortChange,
}: FacilityTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Facility Code</TableHead>
        <TableHead>Facility Name</TableHead>
        <TableHead>
          <DataTableSortHeader
            label="Facility Type"
            field="facilityType"
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableHead>City</TableHead>
        <TableHead>Region</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}
