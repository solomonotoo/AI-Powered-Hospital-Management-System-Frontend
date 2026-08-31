import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { AccountWorkspace } from "@/features/account";

export default function MyAccountPage() {
    return (
        <SharedLayout
            title="My Account"
            description="Manage your personal profile, account credentials, security preferences and active sessions"
        >
            <AccountWorkspace />
        </SharedLayout>
    );
}
