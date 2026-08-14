import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { StaffManagement } from "@/features/staff/components/staff-management";

export default function StaffPage() {
  return (
    <SharedLayout
      title="Staff"
      description="Manage hospital staff, roles, department and access control"
      children={<StaffManagement />}
    />
  );
}
