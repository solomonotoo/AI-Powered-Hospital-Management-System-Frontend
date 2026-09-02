import { MetricCard } from "@/features/shared-features/metric-card";
import { Briefcase, LucideIcon, UserCheck, UserX } from "lucide-react";
import { PagedUsersResponse, UserSummary } from "../types/users";

interface UsersSummaryCardsProps {
  summary: PagedUsersResponse;
}

interface summaryCards {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export const UsersSummaryCards = ({ summary }: UsersSummaryCardsProps) => {
  const staffCards: summaryCards[] = [
    {
      title: "Total Users",
      value: summary.totalElements ?? 0,
      icon: Briefcase,
    },
    {
      title: "Active Users",
      value: summary?.content?.filter((user) => user.active).length ?? 0,
      icon: UserCheck,
    },
    {
      title: "MFA Enabled",
      value: summary?.content?.filter((user) => user.mustChangePassword).length ?? 0,
      icon: UserX,
    },
    {
      title: "Locked / Suspended",
      value: summary?.content?.filter((user) => !user.active).length ?? 0,
      icon: UserX,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* {staffCards?.map(({ title, value, icon: Icon }) => (
                <MetricCard key={title} title={title} value={value} icon={Icon} />
            ))} */}
      {staffCards.map(({ title, value, icon: Icon }) => (
        <MetricCard key={title} title={title} value={value} icon={Icon} />
      ))}
    </div>
  );
};
