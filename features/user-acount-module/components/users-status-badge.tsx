import { Badge } from "@/components/ui/badge";
import { UserSummaryResponse } from "../types/users";

interface UsersStatusBadgeProps {
  status?: UserSummaryResponse["status"];
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
