import { PermissionGuard } from "@/components/auth/permission-guard";
import { AccountDetails } from "@/features/user-acount-module/components/user-profile";

interface UserAssignedRolePageProps {
  params: Promise<{
    usersId?: string;
    userId?: string;
  }>;
}

export default async function UserAssignedRolePage({
  params,
}: UserAssignedRolePageProps) {
  const resolvedParams = await params;
  const userId = resolvedParams.usersId || resolvedParams.userId || "";

  return (
    // [FEATURE REFERENCE]: Access restricted to users with ROLE_MANAGE permission or SUPER_ADMIN
    <PermissionGuard requiredPermissions="ROLE_MANAGE">
      <AccountDetails userId={userId} initialTab="access" />
    </PermissionGuard>
  );
}
