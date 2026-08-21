import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Staff } from "../../types/staff";
import { StaffTableRowActions } from "./staff-table-row-actions";
import { StaffStatusBadge } from "../staff-status-badge";

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
  // console.log("RAW STAFF STATUS:", staff.status);
  return (
    <TableRow
      onClick={() => onRowClick(staff)}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{staff.firstName?.charAt(0)}
            {staff.lastName?.charAt(0)}</AvatarFallback>
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
        <StaffStatusBadge status={staff.status} />
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
