import { PatientWorkspace } from "@/features/patients/components/patient-workspace/patient-workspace";
import React from "react";

export default function PatientWorkspacePage() {
  return <PatientWorkspace />
}


// export default async function PatientWorkspacePage({params}:{params:{patientId:number}}) {
//   return <PatientWorkspace patientId={params.patientId} />
// }

// export default function PatientWorkspacePage() {
//   return <div className="text-3xl text-red-500">Patient workspace page</div>;
// }
