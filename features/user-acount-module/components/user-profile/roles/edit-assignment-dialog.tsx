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
import { Switch } from "@/components/ui/switch";
import { CalendarClock, Loader2 } from "lucide-react";
import { useUpdateUserRoleAssignment } from "@/features/user-acount-module/hook/use-update-user-role";
import { toast } from "sonner";
import { RoleAssignmentResponse, RoleResponse } from "@/features/user-acount-module/types/user-access.types";

interface EditAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  currentUserId: string;
  assignment: RoleAssignmentResponse | null;
  role?: RoleResponse;
}

export function EditAssignmentDialog({
  open,
  onOpenChange,
  userId,
  currentUserId,
  assignment,
  role,
}: EditAssignmentDialogProps) {
  const [isTemporary, setIsTemporary] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");

  const { mutate: updateAssignment, isPending } = useUpdateUserRoleAssignment();

  useEffect(() => {
    if (assignment) {
      if (assignment.expiresAt) {
        setIsTemporary(true);
        // Format ISO date to datetime-local format: YYYY-MM-DDThh:mm
        try {
          const date = new Date(assignment.expiresAt);
          const isoLocal = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
          setExpiresAt(isoLocal);
        } catch {
          setExpiresAt("");
        }
      } else {
        setIsTemporary(false);
        setExpiresAt("");
      }
    }
  }, [assignment, open]);

  if (!assignment) return null;

  const roleName = role?.name || "this role";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment.assignmentId) return;

    if (isTemporary && !expiresAt) {
      toast.error("Please specify an expiration date and time");
      return;
    }

    const payloadExpiresAt = isTemporary && expiresAt
      ? new Date(expiresAt).toISOString()
      : undefined;

    updateAssignment(
      {
        userId,
        assignmentId: assignment.assignmentId,
        currentUserId,
        data: {
          expiresAt: payloadExpiresAt,
        },
      },
      {
        onSuccess: () => {
          toast.success("Role assignment expiration updated");
          onOpenChange(false);
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to update assignment";
          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="size-5 text-primary" />
            Edit Assignment Expiration
          </DialogTitle>
          <DialogDescription>
            Modify the assignment duration for{" "}
            <span className="font-semibold text-foreground">{roleName}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="temp-switch" className="text-sm font-medium">
                Set Expiration Date
              </Label>
              <p className="text-xs text-muted-foreground">
                Toggle off to make this assignment permanent
              </p>
            </div>
            <Switch
              id="temp-switch"
              checked={isTemporary}
              onCheckedChange={setIsTemporary}
            />
          </div>

          {isTemporary && (
            <div className="space-y-2">
              <Label htmlFor="editExpiresAt" className="text-sm">
                Expires At
              </Label>
              <Input
                id="editExpiresAt"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required={isTemporary}
              />
            </div>
          )}

          <DialogFooter className="mt-6 gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending && <Loader2 className="size-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
