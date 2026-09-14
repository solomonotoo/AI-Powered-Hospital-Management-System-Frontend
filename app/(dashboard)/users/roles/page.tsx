import { PermissionGuard } from "@/components/auth/permission-guard";
import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { RolesManagement } from "@/features/user-acount-module/components/roles-management";

export default function RolesPage() {
  return (
    // [FEATURE REFERENCE]: Access restricted to users with ROLE_MANAGE permission or SUPER_ADMIN
    <PermissionGuard requiredPermissions="ROLE_MANAGE">
      <SharedLayout
        title="Roles & Permissions"
        description="Manage hospital system roles, permission bundles, and security access policies"
      >
        <RolesManagement />
      </SharedLayout>
    </PermissionGuard>
  );
}
