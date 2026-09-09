import { DataTableRowActions } from "@/features/shared-features/data-table/data-table-row-actions";
import {
  Eye,
  KeyRound,
  Lock,
  LogOut,
  Pencil,
  UserCheck,
  UserLock,
  UserX,
} from "lucide-react";
import { UserSummaryResponse } from "../../types/users";

interface UsersTableRowActionsProps {
  users: UserSummaryResponse;
  onEdit: (users: UserSummaryResponse) => void;
  onView: (users: UserSummaryResponse) => void;
  onDelete: (users: UserSummaryResponse) => void;
  onExport: (users: UserSummaryResponse) => void;
  onSuspend: (users: UserSummaryResponse) => void;
  onReactivate?: (users: UserSummaryResponse) => void;
}

export function UsersTableRowActions({
  users,
  onEdit,
  onView,
  onDelete,
  onExport,
  onSuspend,
  onReactivate,
}: UsersTableRowActionsProps) {
  const isSuspended = users.status?.toUpperCase() === "SUSPENDED";

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
        // Dynamic Suspend / Reactivate action based on current user status
        isSuspended
          ? {
              label: "Reactivate Account",
              icon: <UserCheck className="h-4 w-4 text-emerald-600" />,
              onClick: () => onReactivate?.(users),
            }
          : {
              label: "Suspend Account",
              icon: <UserLock className="h-4 w-4 text-destructive" />,
              onClick: () => onSuspend(users),
            },
        {
          label: "Delete Account",
          icon: <UserX className="h-4 w-4 text-destructive" />,
          onClick: () => onDelete(users),
        },
      ]}
    />
  );
}
