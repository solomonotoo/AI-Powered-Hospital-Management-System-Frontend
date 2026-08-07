import { MedicalRecordPageQuery } from "../types/medical-records-page-query";

export const medicalRecordKeys = {
    all: ["medical-records"] as const,
    lists: () => [...medicalRecordKeys.all, "list"] as const,
    list: (query: MedicalRecordPageQuery) => [...medicalRecordKeys.lists(), query] as const,
    details: () => [...medicalRecordKeys.all, "detail"] as const,
    detail: (id: string) => [...medicalRecordKeys.details(), id] as const,
}