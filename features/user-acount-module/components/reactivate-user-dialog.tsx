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
import { CheckCircle2, Loader2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { UserSummaryResponse } from "../types/users";
import { useReactivateUser } from "../hook/use-reactivate-user";

interface ReactivateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserSummaryResponse | null;
  currentUserId?: string;
  onSuccess?: () => void;
}

export function ReactivateUserDialog({
  open,
  onOpenChange,
  user,
  currentUserId,
  onSuccess,
}: ReactivateUserDialogProps) {
  const { mutate: reactivateUser, isPending } = useReactivateUser();

  if (!user) return null;

  const handleConfirm = () => {
    if (!user.staffId) {
      toast.error("User identifier is missing");
      return;
    }

    reactivateUser(
      {
        userId: user.staffId,
        currentUserId,
      },
      {
        onSuccess: () => {
          toast.success(
            `Account for ${user.fullName || "user"} reactivated successfully`
          );
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to reactivate account";
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
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <UserCheck className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Reactivate User Account</DialogTitle>
              <DialogDescription className="text-xs">
                Restore full authentication and operational access for this user.
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

          {/* Info notice */}
          <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div className="space-y-1">
              <p className="font-semibold">Account Restoration Scope:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-muted-foreground">
                <li>The user will be able to log in immediately with their existing credentials.</li>
                <li>Assigned roles and active permissions will resume enforcement.</li>
                <li>The user status will revert to ACTIVE across the system directory.</li>
              </ul>
            </div>
          </div>
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
            onClick={handleConfirm}
            disabled={isPending}
            className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Reactivating...</span>
              </>
            ) : (
              <>
                <UserCheck className="size-4" />
                <span>Reactivate Account</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
