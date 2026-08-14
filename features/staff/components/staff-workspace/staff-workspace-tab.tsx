// Rather than using:

import { ComponentType } from "react";
import { Staff } from "../../types/staff";
import { StaffOverview } from "../profile/staff-overview";

// if (activeTab === "overview") {
//   return <PatientOverview />;
// }

// if (activeTab === "visits") {
//   return <PatientVisits />;
// }

// if (activeTab === "laboratory") {
//   return <PatientLaboratory />;
// }

// or

// switch (activeTab) {
//   case "overview":
//     ...
// }
//which will becomes a long chain of conditional as we add 10-15 tabs more in the patient-workspace.
// we'll build a tab registry,, where each tab ID maps directly to its component. Then rendering
// becomes a simple lookup rather than a series of if or switch statements. This scales much better and is
//  closer to how enterprise React applications organize large workspaces
//  This is a pattern you'll also reuse in your HMS for:

// Dashboard widgets
// Settings pages
// Reports
// Administration
// Billing modules
// Pharmacy modules

//NB this file will allow tab content to change when you click on a tab
interface WorkspaceTabsProps {
  activeTab: string;
  staff: Staff;
}

interface WorkspaceTabComponentProps {
  staff: Staff;
}

const ComingSoon: ComponentType<WorkspaceTabComponentProps> = () => (
  <div className="rounded-xl border bg-card p-8 text-center">
    <h2 className="text-lg font-semibold">Coming Soon</h2>

    <p className="mt-2 text-muted-foreground">
      This module is still under development.
    </p>
  </div>
);

const tabRegistry: Record<string, ComponentType<WorkspaceTabComponentProps>> = {
  employment: ComingSoon,
  schedule: ComingSoon,
  attendance: ComingSoon,
  document: ComingSoon,
  activity: ComingSoon,
};

//updated
export function StaffWorkspaceTabs({ activeTab, staff }: WorkspaceTabsProps) {
  const ActiveTab = tabRegistry[activeTab] ?? StaffOverview;

  return <ActiveTab staff={staff} />;
}
