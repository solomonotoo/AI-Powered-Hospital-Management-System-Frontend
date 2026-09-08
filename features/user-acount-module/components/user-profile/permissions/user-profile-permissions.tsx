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
} from "lucide-react";
import { useUserAccess } from "@/features/user-acount-module/hook/use-user-access";
import { useRoles } from "@/features/user-acount-module/hook/use-roles";
import { usePermissions } from "@/features/user-acount-module/hook/use-permissions";
import { LoadingState } from "@/features/shared-features/loading-state";
import { ErrorState } from "@/features/shared-features/error-state";

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

  const {
    data: access,
    isLoading: isAccessLoading,
    isError: isAccessError,
    refetch: refetchAccess,
  } = useUserAccess(userId);

  const { data: allRoles = [], isLoading: isRolesLoading } = useRoles();
  const { data: permissionsCatalog = [], isLoading: isCatalogLoading } = usePermissions();

  // Active role map
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

  // User effective permissions
  const grantedPermissionCodes = useMemo(
    () => new Set(access?.permissions ?? []),
    [access?.permissions]
  );

  // Map each permission code to the role(s) that grant it
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

  // Combine system catalog with effective permissions
  const allPermissions = useMemo<ParsedPermission[]>(() => {
    const codesMap = new Map<string, { description?: string }>();

    // Add permissions from catalog
    for (const p of permissionsCatalog) {
      if (p.code) {
        codesMap.set(p.code, { description: p.description });
      }
    }

    // Also include any effective permission that might not be in catalog
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

  // Distinct modules for filtering
  const availableModules = useMemo(() => {
    const modules = Array.from(new Set(allPermissions.map((p) => p.module))).sort();
    return modules;
  }, [allPermissions]);

  // Filtered permissions
  const filteredPermissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allPermissions.filter((perm) => {
      // Search
      if (
        query &&
        !perm.code.toLowerCase().includes(query) &&
        !perm.action.toLowerCase().includes(query) &&
        !perm.module.toLowerCase().includes(query) &&
        !(perm.description && perm.description.toLowerCase().includes(query))
      ) {
        return false;
      }

      // Status
      if (statusFilter === "granted" && !perm.isGranted) return false;
      if (statusFilter === "not_granted" && perm.isGranted) return false;

      // Module
      if (selectedModule !== "all" && perm.module !== selectedModule) return false;

      return true;
    });
  }, [allPermissions, search, statusFilter, selectedModule]);

  // Group filtered by module
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
      {/* Header */}
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
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
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

                      <div className="flex items-center gap-2 pl-6 sm:pl-0 shrink-0">
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
