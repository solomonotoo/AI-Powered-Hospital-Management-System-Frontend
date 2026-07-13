import { Badge } from "@/components/ui/badge";
import { PatientVisit } from "@/features/patients/types/visit";

//this component is responsible for display the visit type
interface VisitTypeBadgeProps {
  type: PatientVisit["visitType"];
}

export function VisitTypeBadge({ type }: VisitTypeBadgeProps) {
  switch (type) {
    case "OPD":
      return <Badge variant="secondary">OPD</Badge>;
    case "IPD":
      return <Badge variant="secondary">IPD</Badge>;
    case "EMERGENCY":
      return <Badge variant="secondary">Emergency</Badge>;

    default:
      return null;
  }
}
//Exactly like we did with the patient status badge.
