// import { DataTable } from "@/features/shared-features/data-table/data-table";
// import React from "react";
// import FacilityTableHeader from "./facility-table-header";
// import { Facility } from "../../types";
// import { SortState } from "@/features/types/sort-state";
// import { FacilityTableRow } from "./facility-table-row";
// import { TableBody } from "@/components/ui/table";

// interface FacilityTableProps {
//   facilities: Facility[];
//   sort: SortState;
//   onSortChange: (sort: SortState) => void;
// }

// export function FacilityTable({
//   facilities,
//   sort,
//   onSortChange,
// }: FacilityTableProps) {
//   return (
//     <DataTable>
//       <FacilityTableHeader sort={sort} onSortChange={onSortChange} />
//       <TableBody>
//         {facilities.map((facility) => (
//           <FacilityTableRow key={facility.id} facility={facility} />
//         ))}
//       </TableBody>
//     </DataTable>
//   );
// }
