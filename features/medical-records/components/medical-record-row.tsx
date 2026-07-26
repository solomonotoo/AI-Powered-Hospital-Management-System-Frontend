import { TableRow, TableCell } from "@/components/ui/table";
import { MedicalRecord } from "../types/medical-records";
import { VisitTypeBadge } from "@/features/patients/components/patient-workspace/visits/visit-type-badge";
import { VisitActions } from "@/features/patients/components/patient-workspace/visits/visit-actions";
import { VisitStatusBadge } from "@/features/patients/components/patient-workspace/visits/visit-status-badge";

interface MedicalRecordRowProps {
  medRecord: MedicalRecord;
}

export function MedicalRecordRow({ medRecord }: MedicalRecordRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {medRecord.medicalRecordNumber}
      </TableCell>
      <TableCell className="font-medium">{medRecord.visitDate}</TableCell>
      <TableCell className="font-medium">
        <VisitTypeBadge type={medRecord.encounterType} />
      </TableCell>
      <TableCell className="font-medium">{medRecord.department}</TableCell>
      <TableCell className="font-medium">{medRecord.diagnosis}</TableCell>
      <TableCell className="font-medium">
        {medRecord.primaryDiagnosis}
      </TableCell>
      <TableCell className="font-medium">
        {/* <VisitStatusBadge status={medRecord.status} /> */}
      </TableCell>
      <TableCell className="font-medium">
        {medRecord.chiefComplaint ?? "-"}
      </TableCell>
      <TableCell className="font-medium">
        <VisitActions visitId={medRecord.id} />
      </TableCell>
    </TableRow>
  );
}
