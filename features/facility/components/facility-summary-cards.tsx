import {
  Activity,
  ActivitySquare,
  Building2,
  LucideIcon,
  Timer,
} from "lucide-react";
import { FacilityWorkSpaceSummary } from "./facility-workspace-summary";
import { MetricCard } from "@/features/shared-features/metric-card";

interface FacilityCardProps {
  summary: FacilityWorkSpaceSummary;
}

interface SummaryCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function FacilitySummaryCards({ summary }: FacilityCardProps) {
  const facilityCards: SummaryCard[] = [
    {
      title: "Total Facilities",
      value: summary.totalFacilities,
      icon: Building2,
    },
    {
      title: "Active Facilities",
      value: summary.activeFacilities,
      icon: Activity,
    },
    {
      title: "Inactive Facilities",
      value: summary.inActiveFacilities,
      icon: ActivitySquare,
    },
    {
      title: "PENDING_APPROVAL Facilities",
      value: summary.referralPipeline,
      icon: Timer,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-5 xl:grid-cols-6">
      {facilityCards.map(({ title, value, icon: Icon }) => (
        <MetricCard key={title} title={title} value={value} icon={Icon} />
      ))}
    </div>
  );
}
