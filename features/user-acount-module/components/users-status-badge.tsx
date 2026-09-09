import { Badge } from "@/components/ui/badge";
import { UserSummaryResponse } from "../types/users";

interface UsersStatusBadgeProps {
  status?: UserSummaryResponse["status"];
}

export function UsersStatusBadge({ status }: UsersStatusBadgeProps) {
  const normalized = status?.toUpperCase();

  switch (normalized) {
    case "ACTIVE":
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">
          ACTIVE
        </Badge>
      );
    case "SUSPENDED":
      return (
        <Badge
          variant="destructive"
          className="bg-red-500/15 text-red-600 border border-red-500/30 hover:bg-red-500/25 dark:text-red-400"
        >
          SUSPENDED
        </Badge>
      );
    case "INACTIVE":
      return <Badge variant="destructive">INACTIVE</Badge>;
    default:
      return <Badge variant="secondary">{status || "UNKNOWN"}</Badge>;
  }
}
