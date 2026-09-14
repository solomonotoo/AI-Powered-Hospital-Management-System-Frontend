"use client";

import { useMemo, useState } from "react";
import { useRoles } from "../hook/use-roles";
import { useCurrentUser } from "../hook/use-current-user";
import { CreateRoleDialog } from "./user-profile/roles/create-role-dialog";
import { LoadingState } from "@/features/shared-features/loading-state";
import { ErrorState } from "@/features/shared-features/error-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  ShieldPlus,
  Search,
  KeyRound,
  ShieldCheck,
  Layers,
} from "lucide-react";
import Link from "next/link";

export function RolesManagement() {
  const { user: currentUser } = useCurrentUser();
  const { data: roles = [], isLoading, isError, error, refetch } = useRoles();

  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return roles;
    const q = searchQuery.toLowerCase();
    return roles.filter(
      (role) =>
        (role.name && role.name.toLowerCase().includes(q)) ||
        (role.description && role.description.toLowerCase().includes(q)) ||
        role.permissionCodes?.some((p) => p.toLowerCase().includes(q))
    );
  }, [roles, searchQuery]);

  if (isLoading) {
    return <LoadingState message="Loading system roles and permissions catalog..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load roles"
        message={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching system roles."
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search roles or permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {currentUser?.staffId && (
          <Button
            onClick={() => setCreateRoleOpen(true)}
            className="gap-2 w-full sm:w-auto"
          >
            <ShieldPlus className="size-4" />
            <span>Create New Role</span>
          </Button>
        )}
      </div>

      {/* Role Catalog Cards Grid */}
      {filteredRoles.length === 0 ? (
        <Card className="p-12 text-center">
          <Shield className="mx-auto size-12 text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-medium text-foreground">No roles found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No roles match "${searchQuery}". Try clearing the search.`
              : "No system roles are currently defined."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role, idx) => (
            <Card
              key={role.roleId || role.name || `role-${idx}`}
              className="flex flex-col justify-between hover:shadow-sm transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {role.name || "Unnamed Role"}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge
                    variant={role.systemDefined ? "secondary" : "outline"}
                    className="text-[11px]"
                  >
                    {role.systemDefined ? "System" : "Custom"}
                  </Badge>
                </div>
                <CardDescription className="text-xs mt-2 line-clamp-2">
                  {role.description || "No description provided."}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <KeyRound className="size-3.5" />
                    <span className="font-medium">
                      Permissions ({role.permissionCodes?.length || 0})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto pr-1">
                    {role.permissionCodes && role.permissionCodes.length > 0 ? (
                      role.permissionCodes.map((perm) => (
                        <Badge
                          key={perm}
                          variant="outline"
                          className="text-[10px] font-mono px-1.5 py-0 bg-muted/40"
                        >
                          {perm}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        No permissions assigned
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Layers className="size-3" />
                    Role ID: {role.roleId ? role.roleId.slice(0, 8) + "..." : "N/A"}
                  </span>
                  <Button asChild variant="ghost" size="sm" className="text-xs h-7">
                    <Link href="/users">Manage Users</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Role Modal */}
      {currentUser?.staffId && (
        <CreateRoleDialog
          open={createRoleOpen}
          onOpenChange={setCreateRoleOpen}
          currentUserId={currentUser.staffId}
        />
      )}
    </div>
  );
}
