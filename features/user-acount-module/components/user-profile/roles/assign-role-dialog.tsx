"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Shield, UserPlus, Check } from "lucide-react";
import { toast } from "sonner";
import type { RoleAssignmentResponse } from "@/features/user-acount-module/types/user-access.types";
import { useAssignUserRole } from "@/features/user-acount-module/hook/use-assign-user-role";
import { useRoles } from "@/features/user-acount-module/hook/use-roles";

interface AssignRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  currentUserId: string;
  assignments: RoleAssignmentResponse[];
  // Optional callback to trigger the creation of a brand new role
  onCreateNewRole?: () => void;
}

export function AssignRoleDialog({
  open,
  onOpenChange,
  userId,
  currentUserId,
  assignments,
  onCreateNewRole,
}: AssignRoleDialogProps) {
  const [search, setSearch] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [isTemporary, setIsTemporary] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");

  const { data: roles = [], isLoading, isError } = useRoles();
  const { mutate: assignRole, isPending } = useAssignUserRole();

  const activeRoleIds = useMemo(
    () =>
      new Set(
        assignments
          .filter((assignment) => assignment.status === "ACTIVE")
          .map((assignment) => assignment.roleId)
          .filter(Boolean)
      ),
    [assignments]
  );

  const availableRoles = useMemo(
    () => roles.filter((role) => role.roleId && !activeRoleIds.has(role.roleId)),
    [roles, activeRoleIds]
  );

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return availableRoles;
    }
    return availableRoles.filter((role) =>
      [role.name, role.description]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }, [availableRoles, search]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedRoleId("");
      setIsTemporary(false);
      setExpiresAt("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleId) {
      toast.error("Please select a role to assign");
      return;
    }

    if (isTemporary && !expiresAt) {
      toast.error("Please specify an expiration date");
      return;
    }

    const payloadExpiresAt = isTemporary && expiresAt
      ? new Date(expiresAt).toISOString()
      : undefined;

    assignRole(
      {
        userId,
        currentUserId,
        data: {
          roleId: selectedRoleId,
          expiresAt: payloadExpiresAt,
        },
      },
      {
        onSuccess: () => {
          toast.success("Role assigned successfully");
          onOpenChange(false);
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to assign role";
          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="size-5 text-primary" />
            Assign Role
          </DialogTitle>
          <DialogDescription>
            Select a role from the catalog to grant permissions to this user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Search catalog */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search available roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Role selection list */}
          <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {isError && (
              <p className="p-4 text-center text-sm text-destructive">
                Failed to load roles catalog.
              </p>
            )}

            {!isLoading && !isError && filteredRoles.length === 0 && (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground space-y-3">
                <p>{search ? "No matching roles found" : "All available roles are already assigned"}</p>
                {onCreateNewRole && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onOpenChange(false);
                      onCreateNewRole();
                    }}
                    className="gap-1.5"
                  >
                    <Shield className="size-3.5 text-primary" />
                    Create New Role
                  </Button>
                )}
              </div>
            )}

            {!isLoading &&
              !isError &&
              filteredRoles.map((role) => {
                const roleId = role.roleId || "";
                const selected = selectedRoleId === roleId;
                const permissionsCount = role.permissionCodes?.length ?? 0;

                return (
                  <div
                    key={roleId}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRoleId(roleId)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedRoleId(roleId);
                      }
                    }}
                    className={`flex cursor-pointer items-start justify-between rounded-lg border p-3 transition-colors ${
                      selected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {role.name || "Unnamed Role"}
                        </span>
                        {role.systemDefined && (
                          <Badge variant="outline" className="text-[10px]">
                            System
                          </Badge>
                        )}
                      </div>
                      {role.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {role.description}
                        </p>
                      )}
                      <p className="text-[11px] text-muted-foreground">
                        {permissionsCount} permission{permissionsCount === 1 ? "" : "s"} included
                      </p>
                    </div>

                    <div
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40"
                      }`}
                    >
                      {selected && <Check className="size-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Temporary Assignment Switch */}
          <div className="rounded-lg border p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="temporary-switch" className="text-sm font-medium">
                  Temporary Assignment
                </Label>
                <p className="text-xs text-muted-foreground">
                  Specify an expiration date after which this role is revoked automatically
                </p>
              </div>
              <Switch
                id="temporary-switch"
                checked={isTemporary}
                onCheckedChange={setIsTemporary}
              />
            </div>

            {isTemporary && (
              <div className="space-y-1.5 pt-1">
                <Label htmlFor="expiresAt" className="text-xs">
                  Expiration Date & Time
                </Label>
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  required={isTemporary}
                />
              </div>
            )}
          </div>

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
              type="submit"
              disabled={isPending || !selectedRoleId}
              className="gap-2"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              Assign Role
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
