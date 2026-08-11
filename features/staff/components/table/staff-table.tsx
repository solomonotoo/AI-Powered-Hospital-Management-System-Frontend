import { Table, TableBody } from "@/components/ui/table";
import { Staff } from "../../types/staff";
import { StaffTableHeader } from "./staff-table-header";
import { StaffTableRow } from "./staff-table-row";
import { DataTable } from "@/features/shared-features/data-table/data-table";


interface StaffTableProps {
    staff: Staff[];
}



export default function StaffTable({ staff }: StaffTableProps) {
    return (
        <DataTable>
            <StaffTableHeader />
            <TableBody>
                {staff.map((staff) => (
                    <StaffTableRow key={staff.id} staff={staff} />
                ))}
            </TableBody>
        </DataTable>
    );
}