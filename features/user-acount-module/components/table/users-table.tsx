import { Table, TableBody } from "@/components/ui/table";
import { UsersTableHeader } from "./users-table-header";
import { UsersTableRow } from "./users-table-row";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { useEntityDetails } from "@/hooks/use-entity-details";
import { useRouter } from "next/navigation";
import { Users } from "../../types/users";

interface UsersTableProps {
  users: Users[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  const {
    open,
    selectedEntity: selectedFacility,
    showDetails,
    hideDetails,
  } = useEntityDetails<Users>();

  return (
    <DataTable>
      <UsersTableHeader />
      <TableBody>
        {users.map((user) => (
          <UsersTableRow
            key={user.id}
            users={user}
            onRowClick={(user) => router.push(`/users/${user.id}`)}
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
