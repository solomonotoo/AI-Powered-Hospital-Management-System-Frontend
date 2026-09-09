import { PermissionGuard } from "@/components/auth/permission-guard";
import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { StaffManagement } from "@/features/staff/components/staff-management";

export default function StaffPage() {
  return (
    // [FEATURE REFERENCE]: Access restricted to users with STAFF_READ or STAFF_MANAGE permission
    <PermissionGuard requiredPermissions={["STAFF_READ", "STAFF_MANAGE"]}>
      <SharedLayout
        title="Staff"
        description="Manage hospital staff, roles, department and access control"
        children={<StaffManagement />}
      />
    </PermissionGuard>
  );
}
