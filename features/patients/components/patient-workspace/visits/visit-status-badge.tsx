import { Badge } from "@/components/ui/badge";
import { PatientVisit } from "@/features/patients/types/visit";

//this component is responsible for display the visit status
interface VisitStatusBadgeProps {
  status: PatientVisit["status"];
}

export function VisitStatusBadge({ status }: VisitStatusBadgeProps) {
  switch (status) {
    case "Completed":
      return <Badge variant="secondary">Completed</Badge>;
    case "In Progress":
      return <Badge variant="secondary">In Progress</Badge>;
    case "Checked In":
      return <Badge variant="secondary">Checked In</Badge>;
    case "Scheduled":
      return <Badge variant="secondary">Scheduled</Badge>;
    case "Cancel":
      return <Badge variant="secondary">Cancel</Badge>;

    default:
      return null;
  }
}
