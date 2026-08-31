import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { UserManagement } from "@/features/user-acount-module/components/users";

export default function UsersPage() {
  return (
    <SharedLayout
      title="User Accounts"
      description="Manage system access, authentication, roles and account security"
      children={<UserManagement />}
    />
  );
}
