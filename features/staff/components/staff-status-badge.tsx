
import { Badge } from "@/components/ui/badge";
import { Staff } from "../types/staff";


const styles = {
    ACTIVE: "bg-success text-success-foreground",
    INACTIVE: "bg-destructive-soft text-destructive-soft-foreground",
    ON_DUTY: "bg-success text-success-foreground",
    ON_LEAVE: "bg-info text-info-foreground",
};

interface StaffStatusBadgeProps {
    status: Staff['status'];
}
export function StaffStatusBadge({ status }: StaffStatusBadgeProps) {
    switch (status) {
        case "ACTIVE":
            return <Badge>ACTIVE</Badge>;
        case "INACTIVE":
            return <Badge variant="destructive">INACTIVE</Badge>;
        case "ON_DUTY":
            return <Badge variant="secondary">ON_DUTY</Badge>;
        case "ON_LEAVE":
            return <Badge variant="secondary">ON_LEAVE</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}   