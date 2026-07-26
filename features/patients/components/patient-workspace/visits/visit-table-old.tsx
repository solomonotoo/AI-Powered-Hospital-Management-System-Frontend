

// //this component is responsible for the table structure(headers and iterating over data)

// import { PatientVisit } from "@/features/patients/types/visit";
// import { EmptyState } from "../shared/empty-state";
// import { File } from "lucide-react";
// import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { VisitRow } from "./visit-row";

// interface VisiTableProps{
//     visits:PatientVisit[]; // array because a patient can have more than one visit to the hospital
// }

// export function VisitTable({visits}:VisiTableProps){
//     if(visits.length === 0){
//         return(
//             //EmptyState is for shared
//             <EmptyState title="No visits found"
//             description="This patient has no recorded visits"
//             icon={File} />
//         )
//     }

//     return(
//         <Table>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Visit No.</TableHead>
//                     <TableHead>Date & Time</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Department</TableHead>
//                     <TableHead>Clinic</TableHead>
//                     <TableHead>Clinician</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Chief Complaint</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {visits.map((visit) => (
//                     <VisitRow key={visit.id} visit={visit} />
//                 ))}
//             </TableBody>
//         </Table>
//     )
// }