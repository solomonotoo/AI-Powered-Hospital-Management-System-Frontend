import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { StaffOverview } from "@/features/staff/components/staff-overview";

export default function StaffPage() {
  return (
    <SharedLayout
      title="Staff"
      description="Manage hospital staff, roles, department and access control"
      children={<StaffOverview />}
    />
  );
}
