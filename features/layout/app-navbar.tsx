"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/features/layout/theme-toggle";
import { ReusablePhoto } from "../web/reusable-phtoto";
import { Button } from "../../components/ui/button";
import { getCurrentUser, clearAuth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppNavbarProps {
  /** Optional section title shown next to the sidebar trigger, e.g. "Patients" */
  title?: string;
}

function formatRoleLabel(role?: string): { label: string; isBootstrap: boolean } {
  if (!role) return { label: "", isBootstrap: false };
  const upper = role.toUpperCase();
  if (upper === "BOOTSTRAP_SYSTEM_ACCOUNT" || upper === "BOOTSTRAP_ADMIN") {
    return { label: "Bootstrap Admin", isBootstrap: true };
  }
  // Format SCREAMING_SNAKE_CASE to readable Title Case
  const formatted = role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return { label: formatted, isBootstrap: false };
}

export function AppNavbar({ title }: AppNavbarProps) {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const roleInfo = formatRoleLabel(user?.role);

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
                    "text-[11px] font-semibold px-2 py-0.5 rounded border",
                    roleInfo.isBootstrap
                      ? "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40"
                      : "bg-secondary text-secondary-foreground border-border"
                  )}
                >
                  {roleInfo.label}
                </span>
              )}
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
