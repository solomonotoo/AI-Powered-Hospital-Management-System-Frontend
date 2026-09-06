"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2, Search, Shield } from "lucide-react";

import type { RoleAssignmentResponse } from "../../types/user-access.types";
import { Switch } from "@/components/ui/switch";
import { useAssignUserRole } from "../../hook/use-user-access";
import { useRoles } from "../../hook/use-roles";

interface AssignRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  userId: string;

  currentUserId: string;

  assignments: RoleAssignmentResponse[];
}

export function AssignRoleDialog({
  open,
  onOpenChange,
  userId,
  currentUserId,
  assignments,
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
      ),
    [assignments]
  );

  const availableRoles = useMemo(
    () => roles.filter((role) => !activeRoleIds.has(role.roleId)),
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

  function handleSubmit() {
    if (!selectedRoleId) {
      return;
    }

    if (isTemporary && !expiresAt) {
      return;
    }

    assignRole(
      {
        userId,
        currentUserId,

        data: {
          roleId: selectedRoleId,
          ...(isTemporary && expiresAt
            ? {
                expiresAt: new Date(expiresAt).toDateString(),
              }
            : {}),
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="size-5 text-primary" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Assign Role</h2>

                <p className="text-sm text-muted-foreground">
                  Select a role to grant access to this user.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search roles..."
              className="pl-9"
            />
          </div>

          {/* Role list */}
          <div className="max-h-72 space-y-2 overflow-y-auto">
            {isLoading && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Loading available roles...
              </div>
            )}

            {isError && (
              <div className="py-10 text-center text-sm text-destructive">
                Unable to load roles.
              </div>
            )}

            {!isLoading &&
              !isError &&
              filteredRoles.map((role) => {
                const selected = selectedRoleId === role.roleId;

                return (
                  <button
                    key={role.roleId}
                    type="button"
                    onClick={() => setSelectedRoleId(role.roleId)}
                    className={[
                      "w-full rounded-lg border p-4 text-left transition-colors",
                      selected
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Shield className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium">{role.name}</p>

                        {role.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {role.description}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-muted-foreground">
                          {role.permissionCodes?.length} permissions
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

            {!isLoading && !isError && filteredRoles.length === 0 && (
              <div className="py-10 text-center">
                <p className="font-medium">No roles available</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  All available roles may already be assigned to this user.
                </p>
              </div>
            )}
          </div>

          {/* Assignment duration */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>Temporary assignment</Label>

                <p className="mt-1 text-sm text-muted-foreground">
                  Set an expiry date for this role.
                </p>
              </div>

              <Switch checked={isTemporary} onCheckedChange={setIsTemporary} />
            </div>

            {isTemporary && (
              <div className="mt-4">
                <Label htmlFor="expiresAt">Expires at</Label>

                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={expiresAt}
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={(event) => setExpiresAt(event.target.value)}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={
                !selectedRoleId || isPending || (isTemporary && !expiresAt)
              }
              onClick={handleSubmit}
            >
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Assign Role
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
