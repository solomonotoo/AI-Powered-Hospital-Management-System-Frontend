"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { CalendarClock, MoreHorizontal, Shield } from "lucide-react";
import {
  RoleAssignmentResponse,
  RoleResponse,
} from "../../types/user-access.types";

interface RoleAssignmentCardProps {
  userId: string;
  assignment: RoleAssignmentResponse;
  role?: RoleResponse;
  readOnly?: boolean;
}

// function formatDate(value?: string) {
//   if (!value) {
//     return "—";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "—";
//   }

//   return new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   }).format(date);
// }

function getStatusVariant(status?: RoleAssignmentResponse["status"]) {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "EXPIRED":
      return "secondary";
    case "REVOKED":
      return "destructive";
    case "SUSPENDED":
      return "outline";
    default:
      return "secondary";
  }
}

export function RoleAssignmentCard({
  assignment,
  role,
  readOnly = false,
}: RoleAssignmentCardProps) {
  const roleName = role?.name ?? "Unknown role";
  const roleDescription =
    role?.description ?? "Role information is unavailable";
  const permissionCount = role?.permissionCodes?.length ?? 0;
  const isPermanent = !assignment.expiresAt;
  const status = assignment.status;
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="size-5 text-primary" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold">{roleName}</h4>
              <Badge variant="secondary">{status ?? "UNKNOWN"}</Badge>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {roleDescription}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span>
                {isPermanent
                  ? "Permanent assignment"
                  : `Expires ${formatDate(assignment.expiresAt)}`}
              </span>

              <span className="flex items-center gap-1.5">
                <CalendarClock className="size-3.5" />
                {permissionCount} permissions
              </span>

              {assignment.assignedAt && (
                <span>Assigned {formatDate(assignment.assignedAt)}</span>
              )}
            </div>

            {assignment.assignedBy && (
              <p className="mt-2 text-xs text-muted-foreground">
                Assigned by: {assignment.assignedBy}
              </p>
            )}
          </div>
        </div>

        {!readOnly && status === "ACTIVE" && (
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreHorizontal className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
