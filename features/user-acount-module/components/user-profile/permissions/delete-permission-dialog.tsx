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
import { PermissionsResponse } from "@/features/user-acount-module/types/user-access.types";

interface DeletePermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permission: PermissionsResponse | null;
}

/**
 * [ROOM FOR DELETION]: Permission Deletion Dialog
 *
 * Architecture Note:
 * The backend OpenAPI definition currently defines:
 * - GET /api/v1/permissions -> listPermission
 * - POST /api/v1/permissions -> createPermission
 * But does not yet expose DELETE /api/v1/permissions/{code}.
 *
 * This component provides the destructive confirmation UI and warning against
 * breaking roles that bundle this permission code.
 */
export function DeletePermissionDialog({
  open,
  onOpenChange,
  permission,
}: DeletePermissionDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!permission) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // ─────────────────────────────────────────────────────────────
      // [ROOM FOR DELETION]: Connect to DELETE /api/v1/permissions/{code}
      // Example:
      // await permissionsService.deletePermission(permission.code!);
      // ─────────────────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.info(
        `Deletion requested for "${permission.code}". Full backend deletion will activate once DELETE /api/v1/permissions/{code} is deployed.`
      );
      onOpenChange(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete permission";
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
          <DialogTitle className="text-center">Delete Permission</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete permission{" "}
            <code className="font-mono font-semibold text-foreground">
              {permission.code}
            </code>
            ? Any roles currently bundling this code will no longer grant this capability.
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
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            Delete Permission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
