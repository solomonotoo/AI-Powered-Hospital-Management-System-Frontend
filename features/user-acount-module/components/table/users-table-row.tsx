import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { UsersTableRowActions } from "./users-table-row-actions";
import { UsersStatusBadge } from "../users-status-badge";
import { Users } from "../../types/users";
import { MFABadge } from "../mfa-badge";

interface UsersTableRowProps {
  users: Users;
  onRowClick: (user: Users) => void;
  onEdit: (user: Users) => void;
  onView: (users: Users) => void;
  onDelete: (users: Users) => void;
  onExport: (users: Users) => void;
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
      <TableCell className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {users.firstName?.charAt(0)}
            {users.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {users.firstName} {users.lastName}
      </TableCell>
      <TableCell className="font-medium">{users.role}</TableCell>
      <TableCell className="font-medium">
        <UsersStatusBadge status={users.status} />
      </TableCell>
      <TableCell className="font-medium">
        {" "}
        <MFABadge enabled={users.mfaEnabled} />
      </TableCell>
      <TableCell className="font-medium">{users.lastLoginAt}</TableCell>
      <TableCell className="text-medium">
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
