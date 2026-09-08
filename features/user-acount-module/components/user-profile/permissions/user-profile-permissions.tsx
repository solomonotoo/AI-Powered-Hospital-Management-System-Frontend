"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  KeyRound,
  Search,
  CheckCircle2,
  MinusCircle,
  Shield,
  Info,
  Layers,
  Filter,
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserAccess } from "@/features/user-acount-module/hook/use-user-access";
import { useRoles } from "@/features/user-acount-module/hook/use-roles";
import { usePermissions } from "@/features/user-acount-module/hook/use-permissions";
import { LoadingState } from "@/features/shared-features/loading-state";
import { ErrorState } from "@/features/shared-features/error-state";
import { PermissionsResponse } from "@/features/user-acount-module/types/user-access.types";
import { CreatePermissionDialog } from "./create-permission-dialog";
import { EditPermissionDialog } from "./edit-permission-dialog";
import { DeletePermissionDialog } from "./delete-permission-dialog";

interface UserProfilePermissionsProps {
  userId: string;
}

interface ParsedPermission {
  code: string;
  module: string;
  action: string;
  description?: string;
  isGranted: boolean;
  grantedByRoles: string[];
}

/**
 * Parses standard uppercase permission codes like "PATIENT_READ" or "BILLING:CREATE"
 * into a human-friendly module and action label.
 */
function parsePermissionCode(code: string): { module: string; action: string } {
  const parts = code.split(/[_:]/);
  if (parts.length >= 2) {
    const module = parts[0].toUpperCase();
    const action = parts.slice(1).join(" ").toUpperCase();
    return { module, action };
  }
  return { module: "GENERAL", action: code.toUpperCase() };
}

export function UserProfilePermissions({ userId }: UserProfilePermissionsProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "granted" | "not_granted">("all");
  const [selectedModule, setSelectedModule] = useState<string>("all");

  // Dialog state for adding, editing, and deleting permissions
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PermissionsResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PermissionsResponse | null>(null);

  // Fetch effective access control details for this specific user
  const {
    data: access,
    isLoading: isAccessLoading,
    isError: isAccessError,
    refetch: refetchAccess,
  } = useUserAccess(userId);

  // Fetch system-wide roles catalog
  const { data: allRoles = [], isLoading: isRolesLoading } = useRoles();

  // Fetch system-wide permissions catalog (registered permission endpoints)
  const { data: permissionsCatalog = [], isLoading: isCatalogLoading } = usePermissions();

  // Filter to currently active role assignments for this user
  const activeAssignments = useMemo(
    () => (access?.roles ?? []).filter((a) => a.status === "ACTIVE"),
    [access?.roles]
  );

  const activeRoleIds = useMemo(
    () => new Set(activeAssignments.map((a) => a.roleId).filter(Boolean)),
    [activeAssignments]
  );

  const activeRoles = useMemo(
    () => allRoles.filter((r) => r.roleId && activeRoleIds.has(r.roleId)),
    [allRoles, activeRoleIds]
  );

  // User effective permissions granted via RBAC inheritance
  const grantedPermissionCodes = useMemo(
    () => new Set(access?.permissions ?? []),
    [access?.permissions]
  );

  // Map each permission code to the list of roles that grant it to this user
  const permissionToRolesMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const role of activeRoles) {
      const roleName = role.name || "Assigned Role";
      for (const pCode of role.permissionCodes ?? []) {
        const existing = map.get(pCode) ?? [];
        if (!existing.includes(roleName)) {
          existing.push(roleName);
        }
        map.set(pCode, existing);
      }
    }
    return map;
  }, [activeRoles]);

  // Combine system catalog with user effective permissions
  const allPermissions = useMemo<ParsedPermission[]>(() => {
    const codesMap = new Map<string, { description?: string }>();

    // Add permissions defined in system catalog
    for (const p of permissionsCatalog) {
      if (p.code) {
        codesMap.set(p.code, { description: p.description });
      }
    }

    // Also include any effective permission that might not be in catalog yet
    for (const pCode of grantedPermissionCodes) {
      if (!codesMap.has(pCode)) {
        codesMap.set(pCode, {});
      }
    }

    const list: ParsedPermission[] = [];
    codesMap.forEach((meta, code) => {
      const { module, action } = parsePermissionCode(code);
      const isGranted = grantedPermissionCodes.has(code);
      const grantedByRoles = permissionToRolesMap.get(code) ?? [];
      list.push({
        code,
        module,
        action,
        description: meta.description,
        isGranted,
        grantedByRoles,
      });
    });

    return list.sort((a, b) => a.code.localeCompare(b.code));
  }, [permissionsCatalog, grantedPermissionCodes, permissionToRolesMap]);

  // Distinct modules for filtering dropdown
  const availableModules = useMemo(() => {
    const modules = Array.from(new Set(allPermissions.map((p) => p.module))).sort();
    return modules;
  }, [allPermissions]);

  // Filtered permissions list based on search, granted status, and module
  const filteredPermissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allPermissions.filter((perm) => {
      // Search query filtering
      if (
        query &&
        !perm.code.toLowerCase().includes(query) &&
        !perm.action.toLowerCase().includes(query) &&
        !perm.module.toLowerCase().includes(query) &&
        !(perm.description && perm.description.toLowerCase().includes(query))
      ) {
        return false;
      }

      // Status filtering (granted vs not granted)
      if (statusFilter === "granted" && !perm.isGranted) return false;
      if (statusFilter === "not_granted" && perm.isGranted) return false;

      // Module category filtering
      if (selectedModule !== "all" && perm.module !== selectedModule) return false;

      return true;
    });
  }, [allPermissions, search, statusFilter, selectedModule]);

  // Group filtered permissions by module for clean visual categorization
  const groupedByModule = useMemo(() => {
    const groups = new Map<string, ParsedPermission[]>();
    for (const perm of filteredPermissions) {
      const list = groups.get(perm.module) ?? [];
      list.push(perm);
      groups.set(perm.module, list);
    }
    return groups;
  }, [filteredPermissions]);

  if (isAccessLoading || isRolesLoading || isCatalogLoading) {
    return <LoadingState message="Loading permissions matrix..." />;
  }

  if (isAccessError) {
    return (
      <ErrorState
        title="Unable to load permissions"
        message="The user's effective permissions could not be loaded."
        onRetry={() => refetchAccess()}
      />
    );
  }

  const grantedCount = allPermissions.filter((p) => p.isGranted).length;
  const totalCount = allPermissions.length;

  return (
    <div className="space-y-6">
      {/* Header with Title, Stats, and Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Effective Permissions
            </h2>
            <Badge variant="secondary" className="font-semibold">
              {grantedCount} of {totalCount} Granted
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            View system capabilities and operational permissions granted to this account.
          </p>
        </div>

        {/* Global Action: Add New Permission to the system catalog */}
        <Button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="size-4" />
          <span>New Permission</span>
        </Button>
      </div>

      {/* RBAC Informational Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-foreground">
        <Info className="size-5 shrink-0 text-blue-500 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-blue-600 dark:text-blue-400">
            Role-Based Access Control (RBAC) Architecture
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Permissions are dynamically inherited from active assigned roles. To grant or remove specific permissions for this user, add or revoke the corresponding role under the <span className="font-medium text-foreground">Access & Roles</span> tab.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search permissions or codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter buttons */}
          <div className="flex items-center rounded-lg border bg-muted/40 p-0.5">
            <Button
              type="button"
              variant={statusFilter === "all" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="h-7 px-2.5 text-xs font-medium"
            >
              All ({allPermissions.length})
            </Button>
            <Button
              type="button"
              variant={statusFilter === "granted" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("granted")}
              className="h-7 px-2.5 text-xs font-medium"
            >
              Granted ({grantedCount})
            </Button>
            <Button
              type="button"
              variant={statusFilter === "not_granted" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("not_granted")}
              className="h-7 px-2.5 text-xs font-medium"
            >
              Not Granted ({totalCount - grantedCount})
            </Button>
          </div>

          {/* Module filter dropdown */}
          {availableModules.length > 1 && (
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="h-8 rounded-lg border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Modules</option>
              {availableModules.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Permissions Grid Grouped by Module */}
      {groupedByModule.size === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No permissions matching the selected search and filter criteria.
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(groupedByModule.entries()).map(([moduleName, perms]) => {
            const moduleGrantedCount = perms.filter((p) => p.isGranted).length;

            return (
              <div key={moduleName} className="rounded-xl border bg-card shadow-sm overflow-hidden">
                {/* Module Header */}
                <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-primary" />
                    <span className="font-semibold text-sm tracking-wide text-foreground">
                      {moduleName}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {moduleGrantedCount} / {perms.length} active
                  </Badge>
                </div>

                {/* Module Permissions List */}
                <div className="divide-y">
                  {perms.map((perm) => (
                    <div
                      key={perm.code}
                      className={`flex flex-col gap-2 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                        perm.isGranted
                          ? "bg-card hover:bg-muted/30"
                          : "bg-muted/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="space-y-1 flex-1 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {perm.isGranted ? (
                            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                          ) : (
                            <MinusCircle className="size-4 text-muted-foreground/50 shrink-0" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              perm.isGranted ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {perm.action}
                          </span>
                          <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                            {perm.code}
                          </code>
                        </div>

                        {perm.description && (
                          <p className="text-xs text-muted-foreground pl-6">
                            {perm.description}
                          </p>
                        )}
                      </div>

                      {/* Right section: status badges and actions dropdown */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pl-6 sm:pl-0 shrink-0">
                        {perm.isGranted ? (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge
                              variant="default"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-normal"
                            >
                              Granted
                            </Badge>
                            {perm.grantedByRoles.length > 0 && (
                              <span className="text-xs text-muted-foreground">
                                via{" "}
                                <span className="font-medium text-foreground">
                                  {perm.grantedByRoles.join(", ")}
                                </span>
                              </span>
                            )}
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-[11px] text-muted-foreground font-normal">
                            Not Granted
                          </Badge>
                        )}

                        {/* Dropdown Menu for Edit and Delete operations */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                              title="Permission actions"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {/* [ROOM FOR UPDATE]: Edit permission metadata */}
                            <DropdownMenuItem
                              onClick={() =>
                                setEditTarget({
                                  code: perm.code,
                                  description: perm.description,
                                })
                              }
                              className="cursor-pointer gap-2 text-xs"
                            >
                              <Edit3 className="size-3.5 text-muted-foreground" />
                              <span>Edit Details</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* [ROOM FOR DELETION]: Delete permission from system catalog */}
                            <DropdownMenuItem
                              onClick={() =>
                                setDeleteTarget({
                                  code: perm.code,
                                  description: perm.description,
                                })
                              }
                              className="cursor-pointer gap-2 text-xs text-destructive focus:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                              <span>Delete Permission</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Permission Dialog */}
      <CreatePermissionDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      {/* Edit Permission Dialog (Prepared for PUT /api/v1/permissions/{code}) */}
      <EditPermissionDialog
        open={Boolean(editTarget)}
        onOpenChange={(open) => !open && setEditTarget(null)}
        permission={editTarget}
      />

      {/* Delete Permission Dialog (Prepared for DELETE /api/v1/permissions/{code}) */}
      <DeletePermissionDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        permission={deleteTarget}
      />
    </div>
  );
}

