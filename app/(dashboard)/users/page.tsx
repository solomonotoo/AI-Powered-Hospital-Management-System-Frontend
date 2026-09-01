import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { UserList } from "@/features/identity/users";

export default function UserListPage() {
    return <SharedLayout
        title="Users"
        description="Manage system access, authentication, roles and account security"
        children={<UserList />}
    />
}

