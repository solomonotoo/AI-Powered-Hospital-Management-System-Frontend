import { PermissionGuard } from "@/components/auth/permission-guard";
import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { UserManagement } from "@/features/user-acount-module/components/users";

export default function UsersPage() {
  return (
    // [FEATURE REFERENCE]: Access restricted to users with USER_MANAGE permission or SUPER_ADMIN
    <PermissionGuard requiredPermissions="USER_MANAGE">
      <SharedLayout
        title="User Accounts"
        description="Manage system access, authentication, roles and account security"
        children={<UserManagement />}
      />
    </PermissionGuard>
  );
}
