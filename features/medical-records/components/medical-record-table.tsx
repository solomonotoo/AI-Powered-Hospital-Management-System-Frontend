import { SortState } from "@/features/types/sort-state";
import { MedicalRecord } from "../types/medical-records";
import { DataTableEmpty } from "@/features/shared-features/data-table/data-table-empty";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { VisitTableHeader } from "@/features/patients/components/patient-workspace/visits/visit-table-header";
import { TableBody } from "@/components/ui/table";
import { MedicalRecordRow } from "./medical-record-row";

interface MedicalRecordTableProps {
  records: MedicalRecord[]; // array because a patient can have more than one visit to the hospital
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}
export function MedicalRecordTable({
  records,
  sort,
  onSortChange,
}: MedicalRecordTableProps) {
  if (records.length === 0) {
    return (
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
        {records.map((record) => (
          <MedicalRecordRow key={record.id} medRecord={record} />
        ))}
      </TableBody>
    </DataTable>
  );
}
