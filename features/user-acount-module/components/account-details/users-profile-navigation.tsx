import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkspaceTab } from "@/features/shared-features/workspace-tab";
import {
  Activity,
  Calendar,
  FileText,
  LayoutDashboard,
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
    { id: "overview", label: "Overview", icon: Users },
    { id: "access", label: "Access & Role", icon: Activity },
    { id: "authentication", label: "Authentication", icon: Calendar },
    { id: "mfa", label: "MFA", icon: Calendar },
    { id: "userSessions", label: "Session", icon: Calendar },
    { id: "activity", label: "Activity", icon: Calendar },
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
