import { TableBody } from "@/components/ui/table";
import { UsersTableHeader } from "./users-table-header";
import { UsersTableRow } from "./users-table-row";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { useEntityDetails } from "@/hooks/use-entity-details";
import { useRouter } from "next/navigation";
import { UserSummaryResponse } from "../../types/users";

interface UsersTableProps {
  users: UserSummaryResponse[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
//console.log("USERS RECEIVED BY TABLE:", users);
  const {
    open,
    selectedEntity: selectedFacility,
    showDetails,
    hideDetails,
  } = useEntityDetails<UserSummaryResponse>();

  return (
    <DataTable>
      <UsersTableHeader />
      <TableBody>
        {users.map((user) => (
          <UsersTableRow
            key={user.staffId}
            users={user}
            // Navigate to user account profile on row click
            onRowClick={(u) => router.push(`/users/${u.staffId}`)}
            // Navigate to user account profile on 'View Account' action click
            onView={(u) => router.push(`/users/${u.staffId}`)}
            // Navigate directly to Access & Roles tab on 'Edit Access' action click
            onEdit={(u) => router.push(`/users/${u.staffId}?tab=access`)}
            onExport={() => console.log("export user data")}
            onDelete={() => console.log("manage user deletion")}
          />
        ))}
      </TableBody>
    </DataTable>
  );
}
