import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { UserAccountWorkspace } from "@/features/identity/users";

interface UserDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
    const { id } = await params;

    return (
        <SharedLayout
            title="User Account Details"
            description="Manage user access, credentials, multi-factor authentication and security activity"
        >
            <UserAccountWorkspace userId={id} />
        </SharedLayout>
    );
}
