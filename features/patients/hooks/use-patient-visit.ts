import { useQuery } from "@tanstack/react-query";
import { visitService } from "../api/visit-service";
import { PatientVisitQuery } from "../types/visit";
import { patientVisitKeys } from "../api/patient.keys";

export function usePatientVisits(query: PatientVisitQuery) {
  return useQuery({
    queryKey: patientVisitKeys.visits(query),
    queryFn: () => visitService.getPatientVisits(query),
  });
}
