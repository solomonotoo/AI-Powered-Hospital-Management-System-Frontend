import { Badge } from "@/components/ui/badge";
import { Staff } from "@/features/staff/types/staff";
import { Users } from "../types/users";

const styles = {
  ACTIVE: "bg-success text-success-foreground",
  INACTIVE: "bg-destructive-soft text-destructive-soft-foreground",
  ON_DUTY: "bg-success text-success-foreground",
  ON_LEAVE: "bg-info text-info-foreground",
};

interface UsersStatusBadgeProps {
  status: Users["status"];
}
export function UsersStatusBadge({ status }: UsersStatusBadgeProps) {
  switch (status) {
    case "ACTIVE":
      return <Badge>ACTIVE</Badge>;
    case "INACTIVE":
      return <Badge variant="destructive">INACTIVE</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}
