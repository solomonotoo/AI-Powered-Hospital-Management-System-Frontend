// "use client";

// import { useParams } from "next/navigation";
// import { PatientHeader } from "./patient-header";
// import { usePatient } from "../../hooks/use-patient";
// import { PatientSummaryMock, Patients } from "@/features/web/user-data";
// import { PatientSummaryCards } from "./patient-summary-cards";
// import { PatientNaviation } from "./patient-navigation";
// import { useState } from "react";

// export function PatientWorkspace() {
//   const patient = Patients[0]; //static data it will be replace with data from api later
//   const summary = PatientSummaryMock; //mocked data it will later be replaced
//   const [activeTab,setActiveTab] = useState("overview");
//   return (
//     <div className="space-y-6">
//       <PatientHeader patient={patient} />

//       <PatientSummaryCards summary={summary} />
//       <PatientNaviation activeTab={activeTab} onTabChange={setActiveTab}/>

//       <div className="rounded-lg border bg-card p-6">
//         <h2 className="text-lg font-semibold">{activeTab}</h2>

//         <p className="mt-2 text-muted-foreground">
//           Tab content will be rendered here
//         </p>
//       </div>
//     </div>
//   );
// }
