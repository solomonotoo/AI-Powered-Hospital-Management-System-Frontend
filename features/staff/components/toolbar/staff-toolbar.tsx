import { Card } from "@/components/ui/card";
import { StaffSearch } from "./staff-search";
import { StaffFilters } from "./staff-filters";
import { StaffToolbarActions } from "./staff-toolbar-actions";

interface StaffToolbarProps {
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

export function StaffToolbar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onCreateStaff,
}: StaffToolbarProps) {
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
