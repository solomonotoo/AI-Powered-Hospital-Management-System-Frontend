import { useMemo } from "react";
import { useCurrentUser } from "./use-current-user";
import { useUserAccess } from "./use-user-access";

/**
 * Hook to evaluate the current logged-in user's active permissions.
 *
 * Architecture & Permission Model:
 * 1. Super Admin Bypass: Users with the `SUPER_ADMIN` or `super_admin` role
 *    have unrestricted access to all modules, sidemenu items, and protected routes.
 * 2. RBAC/PBAC Resolution: For all other staff members, permissions are dynamically
 *    fetched from the backend (`GET /api/v1/users/{userId}/access`), which computes
 *    the staff member's effective assigned role permissions.
 * 3. Cache & Performance: Uses React Query cache keys (`user-access`) so that
 *    permission checks across layout, sidebar, and pages are instantaneous without
 *    redundant network round-trips.
 */
export function useUserPermissions() {
  // Retrieve the currently authenticated user from localStorage / auth store
  const { user: currentUser, isLoading: isUserLoading } = useCurrentUser();

  // Determine if current user possesses system-level super administrator privileges
  const isSuperAdmin = useMemo(() => {
    const role = currentUser?.role?.toUpperCase();
    return role === "SUPER_ADMIN" || role === "SUPERADMIN";
  }, [currentUser?.role]);

  // Query effective permissions for the current user's staffId from backend
  const {
    data: accessData,
    isLoading: isAccessLoading,
    isFetching: isAccessFetching,
  } = useUserAccess(currentUser?.staffId || "");

  // Extract list of distinct permission code strings (e.g., ["PATIENT_READ", "USER_MANAGE", ...])
  const permissions: string[] = useMemo(() => {
    if (isSuperAdmin) {
      // Super admin is granted a wildcard granting access to all feature codes
      return ["*"];
    }
    return accessData?.permissions ?? [];
  }, [isSuperAdmin, accessData?.permissions]);

  /**
   * Checks if the user has ANY of the provided permission codes.
   * If required is empty or undefined, access is permitted by default.
   *
   * @example
   * hasPermission("PATIENT_READ")
   * hasPermission(["FACILITY_READ", "FACILITY_MANAGE"])
   */
  const hasPermission = useMemo(() => {
    return (required?: string | string[]): boolean => {
      // If no permission requirement is specified, allow access
      if (!required) return true;

      // Super administrators bypass all granular permission checks
      if (isSuperAdmin) return true;

      const requiredArray = Array.isArray(required) ? required : [required];
      if (requiredArray.length === 0) return true;

      // Returns true if the user possesses at least ONE of the required permissions
      return requiredArray.some((perm) => permissions.includes(perm));
    };
  }, [isSuperAdmin, permissions]);

  /**
   * Checks if the user has ALL of the provided permission codes.
   *
   * @example
   * hasAllPermissions(["STAFF_READ", "STAFF_MANAGE"])
   */
  const hasAllPermissions = useMemo(() => {
    return (required: string[]): boolean => {
      if (!required || required.length === 0) return true;
      if (isSuperAdmin) return true;

      // Returns true only if EVERY required permission is present
      return required.every((perm) => permissions.includes(perm));
    };
  }, [isSuperAdmin, permissions]);

  /**
   * Helper to check if the current user's role matches any allowed role.
   * Useful as a legacy fallback when permission codes are not yet configured.
   */
  const hasRole = useMemo(() => {
    return (allowedRoles?: string[]): boolean => {
      if (!allowedRoles || allowedRoles.length === 0) return true;
      if (isSuperAdmin) return true;
      if (!currentUser?.role) return false;

      const current = currentUser.role.toLowerCase();
      return allowedRoles.some((r) => r.toLowerCase() === current);
    };
  }, [isSuperAdmin, currentUser?.role]);

  return {
    currentUser,
    permissions,
    isSuperAdmin,
    hasPermission,
    hasAllPermissions,
    hasRole,
    isLoading: isUserLoading || (Boolean(currentUser?.staffId) && isAccessLoading),
    isFetching: isAccessFetching,
  };
}
