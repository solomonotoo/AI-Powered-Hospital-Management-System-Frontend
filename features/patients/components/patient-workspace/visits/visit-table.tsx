//this component is responsible for the table structure(headers and iterating over data)

import { PatientVisit } from "@/features/patients/types/visit";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VisitRow } from "./visit-row";
import { SortState, VisitSortField } from "@/features/patients/types/table";
import { DataTable } from "../../../../shared-features/data-table/data-table";
import { VisitTableHeader } from "./visit-table-header";
import { DataTableEmpty } from "../../../../shared-features/data-table/data-table-empty";

interface VisitTableProps {
  visits: PatientVisit[]; // array because a patient can have more than one visit to the hospital
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}

export function VisitTable({ visits, sort, onSortChange }: VisitTableProps) {
  if (visits.length === 0) {
    return (
      //EmptyState is for shared
      <DataTableEmpty
        title="No visits found"
        description="This patient has no recorded visits"
        icon="File"
      />
    );
  }

  return (
    <DataTable>
      <VisitTableHeader sort={sort} onSortChange={onSortChange} />
      <TableBody>
        {visits.map((visit) => (
          <VisitRow key={visit.id} visit={visit} />
        ))}
      </TableBody>
    </DataTable>
  );
}
