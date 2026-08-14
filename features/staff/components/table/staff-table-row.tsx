import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Staff } from "../../types/staff";
import { StaffTableRowActions } from "./staff-table-row-actions";

interface StaffTableRowProps {
  staff: Staff;
  onRowClick: (staff: Staff) => void;
  onEdit: (staff: Staff) => void;
  onView: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  onExport: (staff: Staff) => void;
}

export function StaffTableRow({
  staff,
  onRowClick,
  onEdit,
  onView,
  onDelete,
  onExport,
}: StaffTableRowProps) {
  return (
    <TableRow
      onClick={() => onRowClick(staff)}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {staff.firstName}  {staff.lastName}
      </TableCell>
      <TableCell className="font-medium">
        {staff.employeeId}
      </TableCell>
      <TableCell className="font-medium">
        {staff.department}
      </TableCell>
      <TableCell className="font-medium">
        {staff.role}
      </TableCell>
      <TableCell className="font-medium">
        {staff.status}
      </TableCell>
      <TableCell className="font-medium">{staff.phoneNumber}</TableCell>
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
  );
}
