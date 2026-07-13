// import { title } from "process";
// import { SectionCard } from "../shared/section-card";
// import { mockVisits } from "./patient-visits-mocked-data";
// import { VisitTable } from "./visit-table";
// import { VisitSummaryCards } from "./visit-summary-cards";
// import { VisitToolbar } from "./toolbar/visit-toolbar";
// import { useMemo, useState } from "react";

// //unlike the table the visit tab component will acts as the container for the entire tab
// export function VisitTab() {
//   const [search, setSearch] = useState("");
//   const visits = mockVisits; //mocked data, it will be replace will data from the backend api

//   //NB since the search state has been moved from visit-toolbar.tsx to visit-tab.tsx.
//   // component now controls the search state

//   //search state to filter list
// // Why useMemo?
// // Because eventually you'll be filtering:
// // hundreds of visits
// // thousands of lab results
// // medications
// // invoices
// // documents

// // We only recompute when the search changes.
//   const filteredVisits = useMemo(() => {
//     const keyword = search.trim().toLocaleLowerCase();
//     if (!keyword) {
//       return visits;
//     }

//     return visits.filter((visit) => {
//       return (
//         visit.visitNumber.toLowerCase().includes(keyword) ||
//         visit.chiefComplaint?.toLowerCase().includes(keyword)
//       );
//     });
//   },[search]);

//   return (
//     <div className="space-y-6 ">
//       {/* <VisitSummaryCards visits={visits} /> */}
//       <VisitSummaryCards visits={filteredVisits} />
//       <VisitToolbar search={search} onSearchChange={setSearch} />
//       <SectionCard title="Patient Visits">
//         {/* <VisitTable visits={visits} /> */}
//         <VisitTable visits={filteredVisits} />
//       </SectionCard>
//     </div>
//   );
// }
