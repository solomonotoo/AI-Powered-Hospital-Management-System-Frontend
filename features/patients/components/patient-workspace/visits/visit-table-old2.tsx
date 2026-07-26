

// //this component is responsible for the table structure(headers and iterating over data)

// import { PatientVisit } from "@/features/patients/types/visit";
// import { EmptyState } from "../shared/empty-state";
// import { File } from "lucide-react";
// import {  TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { VisitRow } from "./visit-row";
// import { SortState, VisitSortField } from "@/features/patients/types/table";
// import { DataTableSortHeader } from "../shared/data-table-sort-header";
// import { DataTable } from "../shared/data-table/data-table";

// interface VisiTableProps{
//     visits:PatientVisit[]; // array because a patient can have more than one visit to the hospital
//     sort:SortState;
//     onSortChange:(sort:SortState) => void;
// }

// export function VisitTable({visits,sort,onSortChange}:VisiTableProps){
//     if(visits.length === 0){
//         return(
//             //EmptyState is for shared
//             <EmptyState title="No visits found"
//             description="This patient has no recorded visits"
//             icon={File} />
//         )
//     }

//     return(
//         <DataTable>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Visit No.</TableHead>
//                     <TableHead>
//                         <DataTableSortHeader label="Visit Date" field="visitDate" sort={sort} onSortChange={onSortChange} />
//                     </TableHead>
//                     <TableHead><DataTableSortHeader label="Type" field="visitType" sort={sort} onSortChange={onSortChange} /></TableHead>
//                     <TableHead><DataTableSortHeader label="Department" field="department" sort={sort} onSortChange={onSortChange} /></TableHead>
//                     <TableHead>Clinic</TableHead>
//                     <TableHead><DataTableSortHeader label="Clinician" field="clinician" sort={sort} onSortChange={onSortChange} /></TableHead>
//                     <TableHead><DataTableSortHeader label="Status" field="status" sort={sort} onSortChange={onSortChange} /></TableHead>
//                     <TableHead>Chief Complaint</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {visits.map((visit) => (
//                     <VisitRow key={visit.id} visit={visit} />
//                 ))}
//             </TableBody>
//         </DataTable>
//     )
// }