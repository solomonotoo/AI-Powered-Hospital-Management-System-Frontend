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
      value: summary.inactiveFacilities,
      icon: ActivitySquare,
    },
    {
      title: "PENDING_APPROVAL Facilities",
      value: summary.pendingFacilities,
      icon: Timer,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-4 md:grid-cols-4 lg:grid-cols-4">
      {facilityCards.map(({ title, value, icon: Icon }) => (
        <MetricCard key={title} title={title} value={value} icon={Icon} />
      ))}
    </div>
  );
}
