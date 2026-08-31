import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkspaceTab } from "@/features/shared-features/workspace-tab";
import { Activity, Calendar, FileText, LayoutDashboard, Users } from "lucide-react";

interface UsersNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function UsersNavigation({
  activeTab,
  onTabChange,
}: UsersNavigationProps) {
  const tabs: WorkspaceTab[] = [
    { id: "usersTable", label: "All Users", icon: Users },
    { id: "pending", label: "Pending Invitations", icon: Activity },
    { id: "lockedAccounts", label: "Locked Accounts", icon: Calendar },
    { id: "securityEvents", label: "Security Events", icon: Calendar },
  ];

  return (
    <div className="overflow-x-auto bg-card p-2 rounded-lg">
      <div className="flex gap-2 border-b pb-3 justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => onTabChange(tab.id)}
              className="gap-2 whitespace-nowrap"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {tab.badge !== undefined && (
                <Badge variant="secondary">{tab.badge}</Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
