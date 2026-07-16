import { useQuery } from "@tanstack/react-query";
import { visitService } from "../api/visit-service";
import { PatientVisitQuery } from "../types/visit";

export function usePatientVisits(query: PatientVisitQuery) {
  return useQuery({
    queryKey: [
      "patient-visits",
      query.patientId,
      query.search,
      query.visitType,
      query.status,
      query.page,
      query.size,
    ],
    queryFn: () => visitService.getPatientVisits(query),
  });
}
