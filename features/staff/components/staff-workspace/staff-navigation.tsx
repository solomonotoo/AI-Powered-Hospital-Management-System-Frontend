import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkspaceTab } from "@/features/shared-features/workspace-tab";
import { Activity, Calendar, FileText, LayoutDashboard } from "lucide-react";

interface StaffNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function StaffNavigation({
  activeTab,
  onTabChange,
}: StaffNavigationProps) {
  const tabs: WorkspaceTab[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "employment", label: "employement", icon: Activity },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  return (
    <div className="overflow-x-auto bg-card p-2">
      <div className="flex gap-2 border-b pb-3 justify-between">
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
