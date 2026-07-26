import { useQuery } from "@tanstack/react-query";
import { getPatientMedicalRecords } from "../services/medical-record.services";
import { MedicalRecordPageQuery } from "../types/medical-records-page-query";
import { medicalRecordKeys } from "../api/medical-record-keys";

export function usePatientMedicalRecords(query: MedicalRecordPageQuery) {
  return useQuery({
    queryKey: medicalRecordKeys.list(query),
    queryFn: () => getPatientMedicalRecords(query),
  });
}
