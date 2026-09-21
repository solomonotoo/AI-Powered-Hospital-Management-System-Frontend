import { Table, TableBody } from "@/components/ui/table";
import { Staff } from "../../types/staff";
import { StaffTableHeader } from "./staff-table-header";
import { StaffTableRow } from "./staff-table-row";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { useEntityDetails } from "@/hooks/use-entity-details";
import { useRouter } from "next/navigation";

interface StaffTableProps {
  staff: Staff[];
  onEdit?: (staff: Staff) => void;
  onDelete?: (staff: Staff) => void;
}

export default function StaffTable({ staff, onEdit, onDelete }: StaffTableProps) {
  const router = useRouter();

  const {
    open,
    selectedEntity: selectedStaff,
    showDetails,
    hideDetails,
  } = useEntityDetails<Staff>();

  return (
    <DataTable>
      <StaffTableHeader />
      <TableBody>
        {staff.map((item) => (
          <StaffTableRow
            key={item.id}
            staff={item}
            onRowClick={(clickedStaff) => router.push(`/staff/${clickedStaff.id}`)}
            onView={showDetails}
            onEdit={onEdit ?? showDetails}
            onExport={showDetails}
            onDelete={onDelete ?? showDetails}
          />
        ))}
      </TableBody>
    </DataTable>
  );
}
