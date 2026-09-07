import { MetricCard } from "@/features/shared-features/metric-card";
import { Briefcase, LucideIcon, UserCheck, UserX } from "lucide-react";
import { StaffSummaryCardTypes } from "../types/staff";

interface StaffSummaryCardsProps {
    summary: StaffSummaryCardTypes;
}

interface summaryCards {
    title: string;
    value: string | number;
    icon: LucideIcon;
}

export const StaffSummaryCards = ({ summary }: StaffSummaryCardsProps) => {
    const staffCards: summaryCards[] = [
        {
            title: "Total Staff",
            value: summary?.totalStaff ?? 0,
            icon: Briefcase
        },
        {
            title: "Active Staff",
            value: summary?.activeStaff ?? 0,
            icon: UserCheck
        },
        {
            title: "Inactive Staff",
            value: summary?.inactiveStaff ?? 0,
            icon: UserX
        },
        {
            title: "On Duty",
            value: summary?.onDutyStaff ?? 0,
            icon: UserX
        },
        {
            title: "On Leave",
            value: summary?.onLeaveStaff ?? 0,
            icon: UserX
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* {staffCards?.map(({ title, value, icon: Icon }) => (
                <MetricCard key={title} title={title} value={value} icon={Icon} />
            ))} */}
            {staffCards.map(({ title, value, icon: Icon }) => (
                <MetricCard
                    key={title}
                    title={title}
                    value={value}
                    icon={Icon}
                />
            ))}
        </div>
    );
};