import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { StaffProfile } from "@/features/staff/components/staff-profile";

export default function StaffPage() {
    return (
        <SharedLayout
            title="Staff"
            description="Manage hospital staff, roles, department and access control"
            children={<StaffProfile />}
        />
    );
}