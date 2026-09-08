"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useRevokeUserRole } from "@/features/user-acount-module/hook/use-revoke-user-role";
import { toast } from "sonner";
import { RoleAssignmentResponse, RoleResponse } from "@/features/user-acount-module/types/user-access.types";

interface RevokeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  currentUserId: string;
  assignment: RoleAssignmentResponse | null;
  role?: RoleResponse;
}

export function RevokeRoleDialog({
  open,
  onOpenChange,
  userId,
  currentUserId,
  assignment,
  role,
}: RevokeRoleDialogProps) {
  const { mutate: revokeRole, isPending } = useRevokeUserRole();

  if (!assignment) return null;

  const roleName = role?.name || "this role";

  const handleConfirmRevoke = () => {
    if (!assignment.assignmentId) return;

    revokeRole(
      {
        userId,
        assignmentId: assignment.assignmentId,
        currentUserId,
      },
      {
        onSuccess: () => {
          toast.success(`Revoked role assignment for "${roleName}"`);
          onOpenChange(false);
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to revoke role";
          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>
          <DialogTitle className="text-center">Revoke Role Assignment</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to revoke the <span className="font-semibold text-foreground">{roleName}</span> role from this user? The user will immediately lose all permissions granted through this role.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmRevoke}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Revoke Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
