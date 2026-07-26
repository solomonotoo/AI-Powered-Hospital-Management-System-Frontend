// import { useMemo, useState } from "react";
// import { MedicalRecord } from "../types/medical-records";
// import { WorkspaceSection } from "@/features/patients/components/patient-workspace/shared/workspace-section";
// import { MedicalRecordSummaryCards } from "./medical-record-summary-cards";

// interface MedicalRecordTabProps {
//   medicalRecords: MedicalRecord;
// }

// export function MedicalRecordsTab({ medicalRecords }: MedicalRecordTabProps) {
//   const [search, setSearch] = useState("");
//   const [department, setDepartment] = useState("");
//   const [encounterType, setEncounterType] = useState("");
//   const [status, setStatus] = useState("all");
//   const medicalRecord = useState({});

//   const filteredMedicalRecord = useMemo(() => {
//     const keyword = search.trim().toLocaleLowerCase();
//     return medicalRecord.filter((record) => {
//       // const matchesSearch =
//       //   !keyword ||
//       //   record.departments.toLowerCase().includes(keyword) ||
//       //   visit.chiefComplaint?.toLowerCase().includes(keyword);

//       // const matchesType = visitType === "all" || visit.visitType === visitType;

//       // const matchesStatus =
//       //   visitStatus === "all" || visit.status === visitStatus;

//       // return matchesSearch && matchesType && matchesStatus;
//       console.log("medical reords");
//     });
//   }, [search]);

//   return (
//     <WorkspaceSection
//       summary={
//         <MedicalRecordSummaryCards medicalRecords={filteredMedicalRecord} />
//       }
//     />
//   );
// }
