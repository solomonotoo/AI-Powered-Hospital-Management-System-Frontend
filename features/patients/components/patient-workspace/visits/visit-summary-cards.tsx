import { PatientVisit } from "@/features/patients/types/visit";
import { MetricCard } from "@/features/shared-features/metric-card";

interface VisitSummaryCardsProps {
  visits: PatientVisit[];
}

export function VisitSummaryCards({ visits }: VisitSummaryCardsProps) {
  const totalVisits = visits.length;//later will be replaced with summery.totalVisits from the backend

  const opdVisits = visits.filter((visit) => visit.visitType === "OPD").length;
  const ipdVisits = visits.filter((visit) => visit.visitType === "IPD").length;
  const emergencyVisits = visits.filter(
    (visit) => visit.visitType === "EMERGENCY"
  ).length;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard title="Total Visits" value={totalVisits} />
      <MetricCard title="OPD Visits" value={opdVisits} />
      <MetricCard title="IPD Visits" value={ipdVisits} />
      <MetricCard title="Emergency Visits" value={emergencyVisits} />
    </div>
  );
}
