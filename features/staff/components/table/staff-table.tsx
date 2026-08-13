import { Table, TableBody } from "@/components/ui/table";
import { Staff } from "../../types/staff";
import { StaffTableHeader } from "./staff-table-header";
import { StaffTableRow } from "./staff-table-row";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { useEntityDetails } from "@/hooks/use-entity-details";
import { useRouter } from "next/navigation";

interface StaffTableProps {
  staff: Staff[];
}

export default function StaffTable({ staff }: StaffTableProps) {
  const router = useRouter();

  const {
    open,
    selectedEntity: selectedFacility,
    showDetails,
    hideDetails,
  } = useEntityDetails<Staff>();

  return (
    <DataTable>
      <StaffTableHeader />
      <TableBody>
        {staff.map((staff) => (
          <StaffTableRow
            key={staff.id}
            staff={staff}
            onRowClick={(staff) => router.push(`/staff/${staff.id}`)}
            onView={showDetails}
            onEdit={showDetails}
            onExport={showDetails}
            onDelete={showDetails}
          />
        ))}
      </TableBody>
    </DataTable>
  );
}
