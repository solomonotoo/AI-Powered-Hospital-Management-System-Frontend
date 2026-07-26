import { Badge } from "@/components/ui/badge";
import { Facility } from "../types";
import { cn } from "@/lib/utils";

const styles = {
  ACTIVE: "bg-success text-success-foreground",
  INACTIVE: "bg-destructive-soft text-destructive-soft-foreground",
  PENDING: "bg-warning text-warning-foreground",
};

interface FacilityStatusBadgeProps {
  status: Facility["status"];
}
export function FacilityStatusBadge({ status }: FacilityStatusBadgeProps) {
  switch (status) {
    case "ACTIVE":
      return <Badge>ACTIVE</Badge>;
    case "INACTIVE":
      return <Badge variant="destructive">INACTIVE</Badge>;
    case "PENDING":
      return <Badge variant="secondary">PENDING</Badge>;
  }
}
