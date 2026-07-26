import { api } from "@/lib/axios";
import { MedicalRecordPageQuery } from "../types/medical-records-page-query";
import { MedicalRecord } from "../types/medical-records";
import { PageResponse } from "@/features/types/page-response";
import { ApiResponse } from "@/features/types/api-response";
import { API_ROUTES } from "@/lib/api-routes";

export async function getPatientMedicalRecords(query: MedicalRecordPageQuery) {
  const response = await api.get<ApiResponse<PageResponse<MedicalRecord>>>(
    API_ROUTES.MEDICAL_RECORDS.ROOT,
    { params: query }
  );
  return response.data.data;
}
