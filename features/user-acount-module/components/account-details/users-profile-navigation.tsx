import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkspaceTab } from "@/features/shared-features/workspace-tab";
import {
  Activity,
  Calendar,
  FileText,
  KeyRound,
  LayoutDashboard,
  MonitorSmartphone,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";

interface UsersProfileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function UsersProfileNavigation({
  activeTab,
  onTabChange,
}: UsersProfileNavigationProps) {
  const tabs: WorkspaceTab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      //permission: "USER_ACCOUNT_VIEW",
    },
    {
      id: "access",
      label: "Access & Roles",
      icon: Shield,
      //permission: "USER_ACCESS_MANAGE",
    },
    {
      id: "authentication",
      label: "Authentication",
      icon: KeyRound,
      // permission: "USER_AUTHENTICATION_VIEW",
    },
    {
      id: "mfa",
      label: "Multi-Factor Auth",
      icon: ShieldCheck,
      // permission: "USER_MFA_MANAGE",
    },
    {
      id: "userSessions",
      label: "Sessions",
      icon: MonitorSmartphone,
      // permission: "USER_SESSION_VIEW",
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
      // permission: "USER_ACTIVITY_VIEW",
    },
  ];

  return (
    <aside className="w-full shrink-0 lg:w-60 xl:w-64">
      <div className="rounded-xl border bg-card p-2">
        <div className="px-3 pb-3 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Account Management
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
                disabled={tab.disabled}
                onClick={() => onTabChange(tab.id)}
                className="h-11 w-full justify-start gap-3 px-3"
              >
                <Icon className="size-4 shrink-0" />

                <span className="truncate">{tab.label}</span>

                {tab.badge !== undefined && (
                  <Badge
                    variant="secondary"
                    className="ml-auto"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
