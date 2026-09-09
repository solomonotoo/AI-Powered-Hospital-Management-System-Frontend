import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { UsersTableRowActions } from "./users-table-row-actions";
import { UsersStatusBadge } from "../users-status-badge";
import { UserSummaryResponse } from "../../types/users";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

interface UsersTableRowProps {
  users: UserSummaryResponse;
  onRowClick: (user: UserSummaryResponse) => void;
  onEdit: (user: UserSummaryResponse) => void;
  onView: (users: UserSummaryResponse) => void;
  onDelete: (users: UserSummaryResponse) => void;
  onExport: (users: UserSummaryResponse) => void;
  onSuspend: (users: UserSummaryResponse) => void;
  onReactivate?: (users: UserSummaryResponse) => void;
}

export function UsersTableRow({
  users,
  onRowClick,
  onEdit,
  onView,
  onDelete,
  onExport,
  onSuspend,
  onReactivate,
}: UsersTableRowProps) {
  const isSuspended = users.status?.toUpperCase() === "SUSPENDED";

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
        <div className="flex items-center gap-2">
          <UsersStatusBadge status={users.status} />
          {isSuspended && onReactivate && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReactivate(users);
              }}
              title="Reactivate this suspended account"
              className="h-6 px-2 text-[11px] gap-1 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700 dark:text-emerald-400"
            >
              <UserCheck className="size-3" />
              <span>Reactivate</span>
            </Button>
          )}
        </div>
      </TableCell>

      {/* MFA */}
      <TableCell className="font-medium">
        ---
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
          onSuspend={onSuspend}
          onReactivate={onReactivate}
        />
      </TableCell>
    </TableRow>
  );
}
