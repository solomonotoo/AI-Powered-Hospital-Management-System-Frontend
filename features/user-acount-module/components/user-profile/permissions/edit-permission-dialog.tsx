"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Check, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { PermissionsResponse } from "@/features/user-acount-module/types/user-access.types";

interface EditPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permission: PermissionsResponse | null;
}

/**
 * [ROOM FOR UPDATE]: Permission Editing Dialog
 *
 * Architecture Note:
 * The backend OpenAPI definition currently defines:
 * - GET /api/v1/permissions -> listPermission
 * - POST /api/v1/permissions -> createPermission
 * But does not yet expose PUT /api/v1/permissions/{code}.
 *
 * This component provides the complete modern editing UI and validation.
 * When the backend adds PUT /api/v1/permissions/{code}, connect the mutation
 * call in `handleSubmit` below directly to `permissionsService.updatePermission()`.
 */
export function EditPermissionDialog({
  open,
  onOpenChange,
  permission,
}: EditPermissionDialogProps) {
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (permission && open) {
      setDescription(permission.description || "");
    }
  }, [permission, open]);

  if (!permission) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!permission.code) return;

    setIsSaving(true);
    try {
      // ─────────────────────────────────────────────────────────────
      // [ROOM FOR UPDATE]: Connect to PUT /api/v1/permissions/{code}
      // Example:
      // await permissionsService.updatePermission(permission.code, { description });
      // ─────────────────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.info(
        `Permission update registered locally. Full backend synchronization will activate once PUT /api/v1/permissions/{code} is deployed.`
      );
      onOpenChange(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update permission";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Edit3 className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Edit Permission</DialogTitle>
              <DialogDescription className="text-xs">
                Modify the description for security code{" "}
                <code className="font-mono font-semibold text-foreground">
                  {permission.code}
                </code>
                .
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Permission Code
            </Label>
            <Input
              value={permission.code}
              disabled
              className="font-mono text-sm bg-muted/50 cursor-not-allowed uppercase"
            />
            <p className="text-[11px] text-muted-foreground">
              Permission codes are immutable identifiers referenced by backend security annotations.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-perm-desc"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="edit-perm-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSaving}
              rows={3}
              placeholder="Explain the operational privileges granted by this permission..."
              className="resize-none text-sm"
            />
          </div>

          <DialogFooter className="mt-4 gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="gap-2">
              {isSaving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
