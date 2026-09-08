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

  return <AccountDetails userId={userId} initialTab="access" />;
}
