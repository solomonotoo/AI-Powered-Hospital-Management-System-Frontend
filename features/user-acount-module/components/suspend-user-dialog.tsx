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
import { AlertTriangle, Loader2, ShieldAlert, UserLock } from "lucide-react";
import { toast } from "sonner";
import { UserSummaryResponse } from "../types/users";
import { useSuspendUser } from "../hook/use-suspend-user";

interface SuspendUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserSummaryResponse | null;
  currentUserId?: string;
  onSuccess?: () => void;
}

export function SuspendUserDialog({
  open,
  onOpenChange,
  user,
  currentUserId,
  onSuccess,
}: SuspendUserDialogProps) {
  const { mutate: suspendUser, isPending } = useSuspendUser();

  if (!user) return null;

  const isSelf = Boolean(
    currentUserId && user.staffId && currentUserId === user.staffId
  );

  const handleConfirm = () => {
    if (!user.staffId) {
      toast.error("User identifier is missing");
      return;
    }

    if (isSelf) {
      toast.error("You cannot suspend your own administrative account");
      return;
    }

    suspendUser(
      {
        userId: user.staffId,
        currentUserId,
      },
      {
        onSuccess: () => {
          toast.success(
            `Account for ${user.fullName || "user"} suspended successfully`
          );
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to suspend account";
          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isPending && onOpenChange(val)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <UserLock className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Suspend User Account</DialogTitle>
              <DialogDescription className="text-xs">
                Confirm suspension of access privileges for this account.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Target Account Summary Card */}
          <div className="rounded-lg border bg-muted/40 p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground">
                {user.fullName || "Unnamed User"}
              </span>
              {user.staffRole && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                  {user.staffRole}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground flex flex-col gap-0.5">
              <span>Email: {user.loginEmail}</span>
              {user.staffId && (
                <span className="font-mono text-[11px]">ID: {user.staffId}</span>
              )}
            </div>
          </div>

          {/* Warning notice */}
          {isSelf ? (
            <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
              <ShieldAlert className="size-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Action Not Allowed</p>
                <p className="mt-0.5 text-muted-foreground">
                  You cannot suspend your currently signed-in account. An alternate administrator must perform this action.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Security & Clinical Access Impact:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-muted-foreground">
                  <li>Active authentication sessions will be immediately terminated.</li>
                  <li>The user cannot log into the HMS application or mobile clients.</li>
                  <li>Assigned operational roles and permissions will be placed on hold.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
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
            onClick={handleConfirm}
            disabled={isPending || isSelf}
            className="gap-1.5"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Suspending...</span>
              </>
            ) : (
              <>
                <UserLock className="size-4" />
                <span>Suspend Account</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
