import React from "react";
import { MedicalRecord } from "../types/medical-records";
import { MetricCard } from "@/features/shared-features/metric-card";

interface medicalRecordSummaryCardsProps {
  medicalRecords: MedicalRecord[];
}

export function MedicalRecordSummaryCards({
  medicalRecords,
}: medicalRecordSummaryCardsProps) {
  const totalRecords = medicalRecords.length;

  const activeRecords = medicalRecords.filter(
    (record) => record.status == "ACTIVE"
  ).length;

  const archivedRecords = medicalRecords.filter(
    (record) => record.status == "ARCHIVED"
  ).length;

  const PENDING_APPROVALRecords = medicalRecords.filter(
    (record) => record.status === "PENDING_APPROVAL"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard title="Total Records" value={totalRecords} />
      <MetricCard title="Active Records" value={activeRecords} />
      <MetricCard title="Archive Records" value={archivedRecords} />
      <MetricCard title="PENDING_APPROVAL Records" value={PENDING_APPROVALRecords} />
    </div>
  );
}
