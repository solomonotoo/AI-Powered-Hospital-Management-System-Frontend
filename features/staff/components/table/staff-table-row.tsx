import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Staff } from "../../types/staff";


interface StaffTableRowProps {
    staff: Staff;
    //onView: (staff: Staff) => void;
}

export function StaffTableRow({ staff }: StaffTableRowProps) {
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
            <TableCell className="text-right">
                {/* <StaffActionButtons/> */}
            </TableCell>
        </TableRow>
    )
}