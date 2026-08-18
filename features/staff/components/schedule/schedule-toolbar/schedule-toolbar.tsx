import { Card } from "@/components/ui/card";
import { StaffSearch } from "./schedule-search";
import { StaffFilters } from "./schedulef-filters";
import { StaffToolbarActions } from "./schedule-toolbar-actions";

interface ScheduleToolbarProps {
  search: string;
  department: string;
  role: string;
  status: string;
  onSearchChange: (search: string) => void;
  onDepartmentChange: (department: string) => void;
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
  onCreateStaff: () => void;
}

export function ScheduleToolbar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onCreateStaff,
}: ScheduleToolbarProps) {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-2 px-6 py-3">
      <StaffSearch value={search} onChange={onSearchChange} />
      <StaffFilters
        status={status}
        onStatusChange={onStatusChange}
        department={department}
        onDepartmentChange={onDepartmentChange}
        role={role}
        onRoleChange={onRoleChange}
      />
      <StaffToolbarActions
        onExport={() => {
          console.log("Export staff");
        }}
        onNewStaff={onCreateStaff}
      />
    </Card>
  );
}
