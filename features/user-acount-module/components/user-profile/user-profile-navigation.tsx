"use client";

import { Button } from "@/components/ui/button";
import {
  Activity,
  KeyRound,
  LayoutDashboard,
  MonitorSmartphone,
  Shield,
  ShieldCheck,
  Lock,
} from "lucide-react";

export type ProfileTabId =
  | "overview"
  | "access"
  | "permissions"
  | "authentication"
  | "mfa"
  | "userSessions"
  | "activity";

interface TabItem {
  id: ProfileTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface UserProfileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function UserProfileNavigation({
  activeTab,
  onTabChange,
}: UserProfileNavigationProps) {
  const tabs: TabItem[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "access",
      label: "Access & Roles",
      icon: Shield,
    },
    {
      id: "permissions",
      label: "Permissions",
      icon: KeyRound,
    },
    {
      id: "authentication",
      label: "Authentication",
      icon: Lock,
    },
    {
      id: "mfa",
      label: "Multi-Factor Auth",
      icon: ShieldCheck,
    },
    {
      id: "userSessions",
      label: "Sessions",
      icon: MonitorSmartphone,
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
    },
  ];

  return (
    <aside className="w-full shrink-0 lg:w-60 xl:w-64">
      <div className="rounded-xl border bg-card p-2 shadow-sm">
        <div className="px-3 pb-2 pt-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Profile Management
          </p>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                type="button"
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`h-10 w-full justify-start gap-3 px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
