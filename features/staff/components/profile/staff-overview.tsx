import { MetricCard } from "@/features/shared-features/metric-card";
import { Briefcase, LucideIcon, UserCheck, UserX } from "lucide-react";
import { Staff, StaffSummaryCardTypes } from "../../types/staff";
import { SectionCard } from "@/features/shared-features/section-card";
import { StaffInfoRow } from "./staff-info-row";

interface StaffSummaryCardsProps {
  summary: StaffSummaryCardTypes;
  staff: Staff;
}

interface overviewsummaryCards {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export const StaffOverview = ({ summary, staff }: StaffSummaryCardsProps) => {
  const staffCards: overviewsummaryCards[] = [
    {
      title: "Today Shift",
      value: "Morning",
      icon: Briefcase,
    },
    {
      title: "Attendance",
      value: 50,
      icon: UserCheck,
    },
    {
      title: "leave Balance",
      value: "12 Days",
      icon: UserX,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {staffCards?.map(({ title, value, icon: Icon }) => (
          <MetricCard key={title} title={title} value={value} icon={Icon} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionCard title="PERSONAL INFORMATION">
          <StaffInfoRow label="Gender" value={staff.department} />
          <StaffInfoRow label="Date of Birth" value={staff.employmentDate} />
          <StaffInfoRow label="Blood Group" value={staff.phoneNumber} />
          <StaffInfoRow label="Genotype" value={staff.workEmail} />
        </SectionCard>

        <SectionCard title="CONTACT INFORMATION">
          <StaffInfoRow label="Phone" value={staff.phoneNumber} />
          <StaffInfoRow label="Email" value={staff.workEmail} />
          <StaffInfoRow label="Address" value={staff.status} />
          <StaffInfoRow label="City" value={staff.specialisation} />
        </SectionCard>
      </div>
      <SectionCard title="UPCOMING SHIFTS">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StaffInfoRow label="TODAY" value={staff.department} />
          <StaffInfoRow label="Tomorrow" value={staff.employmentDate} />
          <StaffInfoRow label="Friday" value={staff.phoneNumber} />
        </div>
      </SectionCard>
    </>
  );
};
