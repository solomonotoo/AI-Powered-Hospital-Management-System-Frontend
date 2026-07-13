// Rather than using:

import { ComponentType } from "react";
import { Patient } from "../../types/patient";
import { PatientOverview } from "./patient-overview";
import { VisitTab } from "./visits/visit-tab";

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
  patient: Patient;
}

interface WorkspaceTabComponentProps{
    patient:Patient
}

const ComingSoon: ComponentType<WorkspaceTabComponentProps> = () => (
    <div className="rounded-xl border bg-card p-8 text-center">
    <h2 className="text-lg font-semibold">
      Coming Soon
    </h2>

    <p className="mt-2 text-muted-foreground">
      This module is still under development.
    </p>
  </div>
)

const tabRegistry: Record<
string, ComponentType<WorkspaceTabComponentProps>
> = {
    overview : PatientOverview,
    visits:VisitTab ,
    "medical-record": ComingSoon,
    medications:ComingSoon,
    laboratory:ComingSoon,
    billing:ComingSoon,
    document:ComingSoon,
    problems:ComingSoon,
}

// export function WorkspaceTabs({ activeTab, patient }: WorkspaceTabsProps) {
//   const tabs: Record<string, React.ReactNode> = {
//     overview: <PatientOverview patient={patient} />,
//     visits: <div>Visits Module Coming Soon</div>,
//     "medical-record": <div>Medical Record Coming Soon</div>,
//     medications: <div>Medications Module Coming Soon</div>,
//     laboratory: <div>Laboratory Module Coming Soon</div>,
//     billing: <div>Billing Module Coming Soon</div>,
//     documents: <div>Documents Module Coming Soon</div>,
//     problems: <div>Problems Module Coming Soon</div>,
//   };

//   return tabs[activeTab] ?? tabs.overview;
// }


//updated
export function WorkspaceTabs({ activeTab, patient }: WorkspaceTabsProps) {
    const ActiveTab = tabRegistry[activeTab] ?? PatientOverview;
   
    
    return <ActiveTab patient={patient} />;
};
  
  
  