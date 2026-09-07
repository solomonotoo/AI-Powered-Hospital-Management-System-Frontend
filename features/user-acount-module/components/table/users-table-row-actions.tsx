import { DataTableRowActions } from "@/features/shared-features/data-table/data-table-row-actions";
import { Staff } from "@/features/staff/types/staff";

import {
  Download,
  Eye,
  KeyRound,
  Lock,
  LogOut,
  Pencil,
  Trash,
  UserLock,
  UserX,
} from "lucide-react";
import { UserSummaryResponse } from "../../types/users";

// Props definition using OpenAPI UserSummaryResponse
interface UsersTableRowActionsProps {
  users: UserSummaryResponse;
  onEdit: (users: UserSummaryResponse) => void;
  onView: (users: UserSummaryResponse) => void;
  onDelete: (users: UserSummaryResponse) => void;
  onExport: (users: UserSummaryResponse) => void;
}

export function UsersTableRowActions({
  users,
  onEdit,
  onView,
  onDelete,
  onExport,
}: UsersTableRowActionsProps) {
  return (
    <DataTableRowActions
      actions={[
        {
          label: "View Account",
          icon: <Eye className="h-4 w-4" />,
          onClick: () => onView(users),
        },
        {
          label: "Edit Access",
          icon: <Pencil className="h-4 w-4" />,
          onClick: () => onEdit(users),
        },
        {
          label: "Reset Password",
          icon: <Lock className="h-4 w-4" />,
          onClick: () => onDelete(users),
        },
        {
          label: "Reset MFA",
          icon: <KeyRound className="h-4 w-4" />,
          onClick: () => onExport(users),
        },
        {
          label: "Force Sign Out",
          icon: <LogOut className="h-4 w-4" />,
          onClick: () => onExport(users),
        },
        {
          label: "Suspend Account",
          icon: <UserLock className="h-4 w-4" />,
          onClick: () => onExport(users),
        },
        {
          label: "Delete Account",
          icon: <UserX className="h-4 w-4" />,
          onClick: () => onExport(users),
        },
      ]}
    />
  );
}
