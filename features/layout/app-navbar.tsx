"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/features/layout/theme-toggle";
import { ReusablePhoto } from "../web/reusable-phtoto";
import { Button } from "../../components/ui/button";
import { getCurrentUser, clearAuth } from "@/lib/auth";
import { LogOut } from "lucide-react";

interface AppNavbarProps {
  /** Optional section title shown next to the sidebar trigger, e.g. "Patients" */
  title?: string;
}

export function AppNavbar({ title }: AppNavbarProps) {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    setUser(getCurrentUser());
  }, []);

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
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded bg-secondary text-secondary-foreground border">
              {user.fullName} ({user.role})
            </span>
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
