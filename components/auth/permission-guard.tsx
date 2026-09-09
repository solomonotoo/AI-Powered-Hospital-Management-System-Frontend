"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserPermissions } from "@/features/user-acount-module/hook/use-user-permissions";

interface PermissionGuardProps {
  children: React.ReactNode;
  /**
   * One or more permission codes required to access the enclosed page or component.
   * If an array is passed and requireAll is false (default), possessing ANY of the permissions grants access.
   *
   * @example
   * requiredPermissions="USER_MANAGE"
   * requiredPermissions={["FACILITY_READ", "FACILITY_MANAGE"]}
   */
  requiredPermissions: string | string[];
  /**
   * If true, the user must hold ALL specified permissions. Defaults to false (any permission matches).
   */
  requireAll?: boolean;
  /**
   * Optional custom fallback UI. If omitted, the default styled Access Restricted view is displayed.
   */
  fallback?: React.ReactNode;
}

/**
 * Route & Component Security Guard based on User Permissions.
 *
 * Usage in Page components:
 * Wrap the page body with <PermissionGuard requiredPermissions={["PERMISSION_CODE"]}>
 *
 * Behavior:
 * 1. Checks permissions using `useUserPermissions()`.
 * 2. SUPER_ADMIN accounts bypass all restrictions automatically.
 * 3. Shows an accessible "Access Restricted" alert if the user lacks the required permission(s).
 */
export function PermissionGuard({
  children,
  requiredPermissions,
  requireAll = false,
  fallback,
}: PermissionGuardProps) {
  const { hasPermission, hasAllPermissions, isSuperAdmin, isLoading } =
    useUserPermissions();

  const permissionsList = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  // 1. Evaluate permission check
  const isAuthorized = React.useMemo(() => {
    if (isSuperAdmin) return true;
    if (permissionsList.length === 0) return true;

    return requireAll
      ? hasAllPermissions(permissionsList)
      : hasPermission(permissionsList);
  }, [isSuperAdmin, permissionsList, requireAll, hasAllPermissions, hasPermission]);

  // 2. Loading state: render unobtrusive skeleton while permissions are retrieved
  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="mt-8 space-y-3">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // 3. Authorized state: render target page contents
  if (isAuthorized) {
    return <>{children}</>;
  }

  // 4. Custom fallback if provided by caller
  if (fallback) {
    return <>{fallback}</>;
  }

  // 5. Default Access Restricted View
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center p-6 text-center animate-in fade-in-50 duration-300">
      <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive shadow-sm">
        <ShieldAlert className="size-10 stroke-[1.75]" />
        <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-background border shadow-xs text-muted-foreground">
          <Lock className="size-3" />
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Access Restricted
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
        You do not have the required operational permissions to access this feature.
        Access is governed by the hospital role-based access policy.
      </p>

      {/* Display required permissions tag */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-md">
        <span className="text-xs text-muted-foreground mr-1">Required:</span>
        {permissionsList.map((code) => (
          <Badge
            key={code}
            variant="outline"
            className="font-mono text-[11px] border-destructive/30 bg-destructive/5 text-destructive"
          >
            {code}
          </Badge>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex items-center gap-3">
        <Button asChild variant="default" className="gap-2">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            <span>Return to Dashboard</span>
          </Link>
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        If you require access to this section, please contact your hospital administrator.
      </p>
    </div>
  );
}
