"use client";

import { Button } from "@/components/ui/button";
import { Shield, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { RoleAssignmentCard } from "./role-assignment-card";
import { AssignRoleDialog } from "./assign-role-dialog";
import { EffectivePermissionsCard } from "./effective-permissions-card";

import { LoadingState } from "@/features/shared-features/loading-state";
import { ErrorState } from "@/features/shared-features/error-state";
import { useRoles } from "../../hook/use-roles";
import { useUserAccess } from "../../hook/use-user-access";
import { RoleResponse } from "../../types/user-access.types";
import { useCurrentUser } from "../../hook/use-current-user";

interface UserProfileAccessRolesProps {
  userId: string;
}

export function UserProfileAccessRoles({
  userId,
}: UserProfileAccessRolesProps) {
  /**
   * The use rwhose profile we are viewing
   * this MUST come from the profile/list/rout
   */
  const profileUserId = userId;

  // Get current user from localStorage
  /**
   * The currently authenticated user
   * This is NOT the same as profileUserId
   */
  const { user: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUser();
  const currentUserId = currentUser?.staffId;

  const [assignRoleOpen, setAssignRoleOpen] = useState(false);

  //User Access
  const {
    data: access,
    isLoading: isAccessLoading,
    isError: isAccessError,
    error: accessError,
    refetch: refetchAccess,
  } = useUserAccess(profileUserId);

  /* ---------------------------------------------------------------------- */
  /* Role Catalog                                                            */
  /* ---------------------------------------------------------------------- */

  const {
    data: roles = [],
    isLoading: isRolesLoading,
    isError: isRolesError,
  } = useRoles();

  /* ---------------------------------------------------------------------- */
  /* Derived Data                                                          */
  /* ---------------------------------------------------------------------- */

  const assignments = access?.roles ?? [];
  const permissions = access?.permissions ?? [];

  const rolesById = useMemo(() => {
    return new Map<string, RoleResponse>(
      roles
        .filter((role) => Boolean(role.roleId))
        .map((role) => [role.roleId!, role])
    );
  }, [roles]);

  const activeAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.status === "ACTIVE"),
    [assignments]
  );

  const historicalAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.status !== "ACTIVE"),
    [assignments]
  );

  /* ---------------------------------------------------------------------- */
  /* Loading                                                          */
  /* ---------------------------------------------------------------------- */

  if (isCurrentUserLoading || isAccessLoading || isRolesLoading) {
    return <LoadingState message="Loading access and role information..." />;
  }

  /* ---------------------------------------------------------------------- */
  /* Error                                                         */
  /* ---------------------------------------------------------------------- */

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

  if (!currentUserId) {
    return (
      <ErrorState
        title="Authenticated user unavailable"
        message="The current user's identity could not be determined. Please sign in again"
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Access & Roles</h2>

            <p className="text-sm text-muted-foreground">
              Manage assigned roles and review effective access.
            </p>
          </div>
        </div>

        <Button
          className="gap-2"
          onClick={() => setAssignRoleOpen(true)}
          disabled={isRolesError}
        >
          <UserPlus className="size-4" />
          Assign Role
        </Button>
      </div>
      {/* Active roles */}
      <section className="space-y-4">
        <div>
          <h3 className="font-semibold">Active Role Assignments</h3>

          <p className="text-sm text-muted-foreground">
            Roles currently granting access to this user.
          </p>
        </div>

        {activeAssignments.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <Shield className="mx-auto mb-3 size-8 text-muted-foreground" />

            <h4 className="font-medium">No active roles assigned</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Assign a role to grant this user access.
            </p>

            <Button
              variant="outline"
              className="mt-4 gap-2"
              onClick={() => setAssignRoleOpen(true)}
            >
              <UserPlus className="size-4" />
              Assign Role
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAssignments.map((assignment) => (
              <RoleAssignmentCard
                key={assignment.assignmentId}
                assignment={assignment}
                role={rolesById.get(assignment.roleId ?? "")}
                userId={userId}
              />
            ))}
          </div>
        )}
      </section>

      {/* Effective permissions */}
      <section>
        <EffectivePermissionsCard permissions={permissions} />
      </section>

      {/* Historical roles */}
      {historicalAssignments.length > 0 && (
        <section className="space-y-4">
          <div>
            <h3 className="font-semibold">Previous Assignments</h3>

            <p className="text-sm text-muted-foreground">
              Expired, revoked, or suspended role assignments
            </p>
          </div>

          <div className="space-y-3">
            {historicalAssignments.map((assignment) => (
              <RoleAssignmentCard
                key={assignment.assignmentId}
                assignment={assignment}
                role={rolesById.get(assignment.roleId ?? "")}
                userId={userId}
                readOnly
              />
            ))}
          </div>
        </section>
      )}

      <AssignRoleDialog
        open={assignRoleOpen}
        onOpenChange={setAssignRoleOpen}
        userId={userId}
        currentUserId={currentUserId}
        assignments={assignments}
      />
    </div>
  );
}
