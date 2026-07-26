import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortState } from "@/features/patients/types/table";
import { DataTableSortHeader } from "@/features/shared-features/data-table-sort-header";

interface VisitTableHeaderProps {
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}

export function VisitTableHeader({
  sort,
  onSortChange,
}: VisitTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Visit No.</TableHead>
        <TableHead>
          <DataTableSortHeader
            label="Visit Date"
            field="visitDate"
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableHead>
          <DataTableSortHeader
            label="Type"
            field="visitType"
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableHead>
          <DataTableSortHeader
            label="Department"
            field="department"
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableHead>Clinic</TableHead>
        <TableHead>
          <DataTableSortHeader
            label="Clinician"
            field="clinician"
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableHead>
          <DataTableSortHeader
            label="Status"
            field="status"
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableHead>Chief Complaint</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
