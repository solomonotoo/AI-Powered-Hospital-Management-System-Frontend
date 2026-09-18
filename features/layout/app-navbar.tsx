"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/features/layout/theme-toggle";
import { ReusablePhoto } from "../web/reusable-phtoto";
import { Button } from "../../components/ui/button";
import { getCurrentUser, clearAuth } from "@/lib/auth";
import { FacilitySwitcher } from "@/features/facility/components/facility-switcher";
import { LogOut, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppNavbarProps {
  /** Optional section title shown next to the sidebar trigger, e.g. "Patients" */
  title?: string;
}

function formatRoleLabel(role?: string): { label: string; isSuperAdmin: boolean; isFacilityHead: boolean } {
  if (!role) return { label: "", isSuperAdmin: false, isFacilityHead: false };
  const upper = role.toUpperCase();
  if (upper === "SUPER_ADMIN_ROLE" || upper === "SUPER_ADMIN") {
    return { label: "System Super Admin", isSuperAdmin: true, isFacilityHead: false };
  }
  if (upper === "FACILITY_SUPER_ADMIN_ROLE") {
    return { label: "Medical Superintendent", isSuperAdmin: false, isFacilityHead: true };
  }
  if (upper === "FACILITY_ADMIN_ROLE") {
    return { label: "Facility Admin", isSuperAdmin: false, isFacilityHead: false };
  }
  // Format SCREAMING_SNAKE_CASE to readable Title Case
  const formatted = role
    .replace(/_ROLE$/i, "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return { label: formatted, isSuperAdmin: false, isFacilityHead: false };
}

export function AppNavbar({ title }: AppNavbarProps) {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const updateUser = () => setUser(getCurrentUser());
    updateUser();

    if (typeof window !== "undefined") {
      window.addEventListener("auth_user_changed", updateUser);
      return () => window.removeEventListener("auth_user_changed", updateUser);
    }
  }, []);

  const roleInfo = formatRoleLabel(user?.role);
  const canSelectFacility = Boolean(user?.canSelectFacility || roleInfo.isSuperAdmin);

  return (
    <nav className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        {title && (
          <span className="text-sm font-medium text-foreground">{title}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-medium text-foreground">
                {user.fullName}
              </span>
              {user.role && (
                <span
                  className={cn(
                    "text-[11px] font-semibold px-2 py-0.5 rounded border inline-flex items-center gap-1",
                    roleInfo.isSuperAdmin
                      ? "bg-purple-500/10 text-purple-600 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/40"
                      : roleInfo.isFacilityHead
                      ? "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40"
                      : "bg-secondary text-secondary-foreground border-border"
                  )}
                >
                  {roleInfo.isSuperAdmin && <ShieldCheck className="size-3" />}
                  {roleInfo.label}
                </span>
              )}

              {/* Dynamic Facility Switcher */}
              <FacilitySwitcher
                currentFacilityId={user.facilityId}
                currentFacilityName={user.facilityName}
                currentFacilityCode={user.facilityCode}
                canSelectFacility={canSelectFacility}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearAuth()}
              className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </Button>
          </div>
        ) : null}
        <ThemeToggle />
        <ReusablePhoto src="/images/solo.jpg" />
      </div>
    </nav>
  );
}
