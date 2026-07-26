import { TableCell, TableRow } from "@/components/ui/table";
import { Facility } from "../../types";
import { FacilityTableRowActions } from "../facility-table-row-actions";
import { FacilityStatusBadge } from "../facility-status-badge";

interface FacilityTableRowProps {
  facility: Facility;
  onView: (facility: Facility) => void;
}

export function FacilityTableRow({ facility, onView }: FacilityTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{facility.code}</TableCell>
      <TableCell className="font-medium">{facility.name}</TableCell>
      <TableCell className="font-medium">{facility.type}</TableCell>
      <TableCell className="font-medium">{facility.location.city}</TableCell>
      <TableCell className="font-medium">{facility.location.state}</TableCell>
      <TableCell className="font-medium">
        <FacilityStatusBadge status={facility.status} />
      </TableCell>
      <TableCell className="font-medium">
        <FacilityTableRowActions facility={facility} onView={onView} />
      </TableCell>
    </TableRow>
  );
}
