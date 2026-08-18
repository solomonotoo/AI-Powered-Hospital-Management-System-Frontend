import { Table, TableBody } from "@/components/ui/table";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { Staff } from "@/features/staff/types/staff";
import { useEntityDetails } from "@/hooks/use-entity-details";
import { useRouter } from "next/navigation";
import { ScheduleTableHeader } from "./schedule-table-header";
import { ScheduleTableRow } from "./schedule-table-row";

interface ScheduleTableProps {
  staff: Staff[];
}

export default function ScheduleTable({ staff }: ScheduleTableProps) {
  const router = useRouter();

  const {
    open,
    selectedEntity: selectedFacility,
    showDetails,
    hideDetails,
  } = useEntityDetails<Staff>();

  return (
    <DataTable>
      <ScheduleTableHeader />
      <TableBody>
        {staff.map((staff) => (
          <ScheduleTableRow
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
