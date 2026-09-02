import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { UsersTableRowActions } from "./users-table-row-actions";
import { UsersStatusBadge } from "../users-status-badge";
import { UserSummary } from "../../types/users";
import { MFABadge } from "../mfa-badge";

interface UsersTableRowProps {
  users: UserSummary;
  onRowClick: (user: UserSummary) => void;
  onEdit: (user: UserSummary) => void;
  onView: (users: UserSummary) => void;
  onDelete: (users: UserSummary) => void;
  onExport: (users: UserSummary) => void;
}

export function UsersTableRow({
  users,
  onRowClick,
  onEdit,
  onView,
  onDelete,
  onExport,
}: UsersTableRowProps) {
  // console.log("RAW users STATUS:", users.status);
  return (
    <TableRow
      onClick={() => onRowClick(users)}
      className="cursor-pointer hover:bg-muted/50"
    >
      {/* User */}
      <TableCell className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />

          <AvatarFallback>
            {users.fullName?.charAt(0)?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>

        <span className="font-medium text-wrap w-32">{users.fullName}</span>
      </TableCell>

      {/* Email */}
      <TableCell className="font-medium">
        {users.loginEmail}
      </TableCell>

      {/* Change Password */}
      <TableCell className="font-medium">
        {users.mustChangePassword ? "Yes" : "No"}
      </TableCell>

      {/* Status */}
      <TableCell className="font-medium">
        <UsersStatusBadge
          status={users.active ? "Active" : "Locked / Suspended"}
        />
      </TableCell>

      {/* MFA */}
      <TableCell className="font-medium">
        ---
        {/* <MFABadge enabled={users.mfaEnabled} /> */}
      </TableCell>

      {/* Last Login */}
      <TableCell className="w-[160px] max-w-[160px] font-medium">
        {users.lastLoginAt ? (
          <div className="flex flex-col">
            <span>
              {new Date(users.lastLoginAt).toLocaleDateString()}
            </span>
            <span className="text-muted-foreground">
              {new Date(users.lastLoginAt).toLocaleTimeString()}
            </span>
          </div>
        ) : (
          "Never"
        )}
      </TableCell>




      {/* Actions */}
      <TableCell className="text-right">
        <UsersTableRowActions
          users={users}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
          onExport={onExport}
        />
      </TableCell>
    </TableRow>
  );
}
