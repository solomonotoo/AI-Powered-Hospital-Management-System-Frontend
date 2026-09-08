"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import { RoleResponse } from "@/features/user-acount-module/types/user-access.types";

interface DeleteRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: RoleResponse | null;
  currentUserId: string;
}

/**
 * [ROOM FOR DELETION]: Role Deletion Dialog
 *
 * Architecture Note:
 * The backend OpenAPI definition currently defines:
 * - GET /api/v1/roles
 * - POST /api/v1/roles
 * But does not yet expose DELETE /api/v1/roles/{roleId}.
 *
 * This component provides the destructive confirmation UI, guardrails against
 * deleting system-defined roles, and line comments for immediate wiring once
 * the backend exposes the DELETE endpoint.
 */
export function DeleteRoleDialog({
  open,
  onOpenChange,
  role,
  currentUserId: _currentUserId,
}: DeleteRoleDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!role) return null;

  const roleName = role.name || "this role";

  const handleDelete = async () => {
    // Prevent deletion of core system-defined roles
    if (role.systemDefined) {
      toast.error("System-defined roles cannot be deleted as they are required by core hospital operations.");
      return;
    }

    setIsDeleting(true);
    try {
      // ─────────────────────────────────────────────────────────────
      // [ROOM FOR DELETION]: Connect to DELETE /api/v1/roles/{roleId}
      // Example:
      // await rolesService.deleteRole(role.roleId!, currentUserId);
      // ─────────────────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.info(
        `Deletion requested for "${roleName}". Full backend deletion will activate once DELETE /api/v1/roles/{id} is deployed.`
      );
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete role";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>
          <DialogTitle className="text-center">Delete Role</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete <span className="font-semibold text-foreground">{roleName}</span>?
            {role.systemDefined ? (
              <span className="mt-2 block font-medium text-destructive">
                This is a protected system role and cannot be deleted.
              </span>
            ) : (
              <span className="mt-1 block text-muted-foreground">
                All staff members currently assigned this role will lose its corresponding access permissions.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || Boolean(role.systemDefined)}
            className="gap-2"
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            Delete Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
