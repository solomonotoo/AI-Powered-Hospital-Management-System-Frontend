import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Staff } from "../../types/staff";
import { StaffTableRowActions } from "./staff-table-row-actions";


interface StaffTableRowProps {
    staff: Staff;
    onEdit: (staff: Staff) => void;
    onView: (staff: Staff) => void;
    onDelete: (staff: Staff) => void;
    onExport: (staff: Staff) => void;

}

export function StaffTableRow({ staff, onEdit, onView, onDelete, onExport }: StaffTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {staff.personalInfo.fullName}
            </TableCell>
            <TableCell className="font-medium">{staff.employmentInfo.employeeId}</TableCell>
            <TableCell className="font-medium">{staff.employmentInfo.department}</TableCell>
            <TableCell className="font-medium">{staff.employmentInfo.position}</TableCell>
            <TableCell className="font-medium">{staff.employmentInfo.employmentStatus}</TableCell>
            <TableCell className="font-medium">{staff.contactInfo.phone}</TableCell>
            <TableCell className="text-medium">
                <StaffTableRowActions
                    staff={staff}
                    onEdit={onEdit}
                    onView={onView}
                    onDelete={onDelete}
                    onExport={onExport}
                />

            </TableCell>
        </TableRow>
    )
}