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
            onRowClick={(user) => router.push(`/users/${user.staffId}`)}
            onView={showDetails}
            onEdit={() => console.log("edit page comming soon")}
            onExport={() => console.log("export page comming soon")}
            onDelete={() => console.log("delete page comming soon")}
          />
        ))}
      </TableBody>
    </DataTable>
  );
}
