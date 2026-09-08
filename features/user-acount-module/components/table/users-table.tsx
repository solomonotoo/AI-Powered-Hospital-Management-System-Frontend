"use client";

import { TableBody } from "@/components/ui/table";
import { UsersTableHeader } from "./users-table-header";
import { UsersTableRow } from "./users-table-row";
import { DataTable } from "@/features/shared-features/data-table/data-table";
import { useRouter } from "next/navigation";
import { UserSummaryResponse } from "../../types/users";
import { useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "../queries/user-access-query-keys";

interface UsersTableProps {
  users: UserSummaryResponse[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleNavigate = (u: UserSummaryResponse, tab?: string) => {
    if (u.staffId) {
      // Seed detail query cache immediately for instant UI population
      queryClient.setQueryData(userQueryKeys.detail(u.staffId), u);
    }
    const targetUrl = tab ? `/users/${u.staffId}?tab=${tab}` : `/users/${u.staffId}`;
    router.push(targetUrl);
  };

  return (
    <DataTable>
      <UsersTableHeader />
      <TableBody>
        {users.map((user) => (
          <UsersTableRow
            key={user.staffId}
            users={user}
            // Navigate to user account profile on row click
            onRowClick={(u) => handleNavigate(u)}
            // Navigate to user account profile on 'View Account' action click
            onView={(u) => handleNavigate(u)}
            // Navigate directly to Access & Roles tab on 'Edit Access' action click
            onEdit={(u) => handleNavigate(u, "access")}
            onExport={() => console.log("export user data")}
            onDelete={() => console.log("manage user deletion")}
          />
        ))}
      </TableBody>
    </DataTable>
  );
}
