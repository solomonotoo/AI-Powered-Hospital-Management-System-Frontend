import { TableCell, TableRow } from "@/components/ui/table";
import { PatientVisit } from "@/features/patients/types/visit";
import { VisitTypeBadge } from "./visit-type-badge";
import { VisitStatusBadge } from "./visit-status-badge";
import { VisitActions } from "./visit-actions";


//This component represents one row in the visit history table.
//and its responsible for rendering a single visit
interface VisitRowProps{
    visit:PatientVisit;
}

export function VisitRow({visit}:VisitRowProps){
    return (
        <TableRow>
            <TableCell className="font-medium">
                {visit.visitNumber}
            </TableCell>
            <TableCell className="font-medium">
                {visit.visitDate}
            </TableCell>
            <TableCell className="font-medium">
               <VisitTypeBadge type={visit.visitType} />
            </TableCell>
            <TableCell className="font-medium">
                {visit.department}
            </TableCell>
            <TableCell className="font-medium">
                {visit.clinic}
            </TableCell>
            <TableCell className="font-medium">
                {visit.clinician}
            </TableCell>
            <TableCell className="font-medium">
                <VisitStatusBadge status={visit.status} />
            </TableCell>
            <TableCell className="font-medium">
                {visit.chiefComplaint ?? "-"}
            </TableCell>
            <TableCell className="font-medium">
                <VisitActions  visitId={visit.id} />
            </TableCell>
        </TableRow>
    )
}