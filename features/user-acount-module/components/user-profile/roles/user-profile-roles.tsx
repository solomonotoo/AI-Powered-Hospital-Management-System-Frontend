"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, UserPlus, History } from "lucide-react";
import { RoleAssignmentCard } from "./role-assignment-card";
import { AssignRoleDialog } from "./assign-role-dialog";
import { RevokeRoleDialog } from "./revoke-role-dialog";
import { EditAssignmentDialog } from "./edit-assignment-dialog";
import { LoadingState } from "@/features/shared-features/loading-state";
import { ErrorState } from "@/features/shared-features/error-state";
import { useRoles } from "@/features/user-acount-module/hook/use-roles";
import { useUserAccess } from "@/features/user-acount-module/hook/use-user-access";
import { useCurrentUser } from "@/features/user-acount-module/hook/use-current-user";
import {
  RoleAssignmentResponse,
  RoleResponse,
} from "@/features/user-acount-module/types/user-access.types";

interface UserProfileRolesProps {
  userId: string;
}

export function UserProfileRoles({ userId }: UserProfileRolesProps) {
  const { user: currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();
  const currentUserId = currentUser?.staffId;

  // Dialog state
  const [assignRoleOpen, setAssignRoleOpen] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [editExpirationOpen, setEditExpirationOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<RoleAssignmentResponse | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleResponse | undefined>(
    undefined
  );

  // Queries
  const {
    data: access,
    isLoading: isAccessLoading,
    isError: isAccessError,
    error: accessError,
    refetch: refetchAccess,
  } = useUserAccess(userId);

  const {
    data: roles = [],
    isLoading: isRolesLoading,
    isError: isRolesError,
  } = useRoles();

  const assignments = access?.roles ?? [];

  const rolesById = useMemo(() => {
    return new Map<string, RoleResponse>(
      roles
        .filter((role) => Boolean(role.roleId))
        .map((role) => [role.roleId!, role])
    );
  }, [roles]);

  const activeAssignments = useMemo(
    () => assignments.filter((a) => a.status === "ACTIVE"),
    [assignments]
  );

  const historicalAssignments = useMemo(
    () => assignments.filter((a) => a.status !== "ACTIVE"),
    [assignments]
  );

  const handleOpenRevoke = (
    assignment: RoleAssignmentResponse,
    role?: RoleResponse
  ) => {
    setSelectedAssignment(assignment);
    setSelectedRole(role);
    setRevokeDialogOpen(true);
  };

  const handleOpenEditExpiration = (
    assignment: RoleAssignmentResponse,
    role?: RoleResponse
  ) => {
    setSelectedAssignment(assignment);
    setSelectedRole(role);
    setEditExpirationOpen(true);
  };

  if (isCurrentUserLoading || isAccessLoading || isRolesLoading) {
    return <LoadingState message="Loading access and role information..." />;
  }

  if (isAccessError) {
    return (
      <ErrorState
        title="Unable to load user access"
        message={
          accessError instanceof Error
            ? accessError.message
            : "The user's access information could not be loaded."
        }
        onRetry={() => refetchAccess()}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Role Assignments
            </h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {activeAssignments.length} Active
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage assigned roles and grant or revoke access capabilities.
          </p>
        </div>

        <Button
          onClick={() => setAssignRoleOpen(true)}
          disabled={!currentUserId || isRolesError}
          className="gap-2 shrink-0"
        >
          <UserPlus className="size-4" />
          Assign Role
        </Button>
      </div>

      {/* Active Role Assignments */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Active Roles
          </h3>
          <p className="text-xs text-muted-foreground">
            Roles currently granting permissions to this account.
          </p>
        </div>

        {activeAssignments.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <Shield className="mx-auto mb-3 size-10 text-muted-foreground/60" />
            <h4 className="font-semibold text-foreground">No active roles assigned</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              This user does not currently hold any active roles.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-2"
              onClick={() => setAssignRoleOpen(true)}
              disabled={!currentUserId}
            >
              <UserPlus className="size-4" />
              Assign Role Now
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAssignments.map((assignment) => (
              <RoleAssignmentCard
                key={assignment.assignmentId}
                userId={userId}
                assignment={assignment}
                role={rolesById.get(assignment.roleId ?? "")}
                onRevoke={handleOpenRevoke}
                onEditExpiration={handleOpenEditExpiration}
              />
            ))}
          </div>
        )}
      </section>

      {/* Historical / Revoked Assignments */}
      {historicalAssignments.length > 0 && (
        <section className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <History className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Assignment History
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Expired, revoked, or suspended role assignments.
          </p>

          <div className="space-y-3 opacity-90">
            {historicalAssignments.map((assignment) => (
              <RoleAssignmentCard
                key={assignment.assignmentId}
                userId={userId}
                assignment={assignment}
                role={rolesById.get(assignment.roleId ?? "")}
                readOnly
              />
            ))}
          </div>
        </section>
      )}

      {/* Dialogs */}
      {currentUserId && (
        <>
          <AssignRoleDialog
            open={assignRoleOpen}
            onOpenChange={setAssignRoleOpen}
            userId={userId}
            currentUserId={currentUserId}
            assignments={assignments}
          />

          <RevokeRoleDialog
            open={revokeDialogOpen}
            onOpenChange={setRevokeDialogOpen}
            userId={userId}
            currentUserId={currentUserId}
            assignment={selectedAssignment}
            role={selectedRole}
          />

          <EditAssignmentDialog
            open={editExpirationOpen}
            onOpenChange={setEditExpirationOpen}
            userId={userId}
            currentUserId={currentUserId}
            assignment={selectedAssignment}
            role={selectedRole}
          />
        </>
      )}
    </div>
  );
}
