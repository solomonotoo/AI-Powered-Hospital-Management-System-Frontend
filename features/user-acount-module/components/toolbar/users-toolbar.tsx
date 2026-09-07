import { Card } from "@/components/ui/card";
import { UsersFilters } from "./users-filters";
import { UsersSearch } from "./users-search";
import { UsersToolbarActions } from "./users-toolbar-actions";

interface UsersToolbarProps {
  search: string;
  department: string;
  role: string;
  status: string;
  onSearchChange: (search: string) => void;
  onDepartmentChange: (department: string) => void;
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
  onCreateCredential: () => void;
}

export function UsersToolbar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onCreateCredential,
}: UsersToolbarProps) {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-2 px-6 py-3">
      <UsersSearch value={search} onChange={onSearchChange} />
      <UsersFilters
        status={status}
        onStatusChange={onStatusChange}
        department={department}
        onDepartmentChange={onDepartmentChange}
        role={role}
        onRoleChange={onRoleChange}
      />
      <UsersToolbarActions onExportCredentials={() => {
        console.log("Export staff");
      }} onNewCredential={onCreateCredential} />
    </Card>
  );
}
