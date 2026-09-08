"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import {
  CalendarClock,
  MoreVertical,
  Shield,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  RoleAssignmentResponse,
  RoleResponse,
} from "@/features/user-acount-module/types/user-access.types";

interface RoleAssignmentCardProps {
  userId: string;
  assignment: RoleAssignmentResponse;
  role?: RoleResponse;
  readOnly?: boolean;
  onEditExpiration?: (assignment: RoleAssignmentResponse, role?: RoleResponse) => void;
  onRevoke?: (assignment: RoleAssignmentResponse, role?: RoleResponse) => void;
}

function getStatusBadge(status?: RoleAssignmentResponse["status"]) {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge variant="default" className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
          <CheckCircle className="size-3" />
          Active
        </Badge>
      );
    case "EXPIRED":
      return (
        <Badge variant="secondary" className="gap-1">
          <Clock className="size-3" />
          Expired
        </Badge>
      );
    case "REVOKED":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="size-3" />
          Revoked
        </Badge>
      );
    case "SUSPENDED":
      return (
        <Badge variant="outline" className="gap-1 text-amber-600 border-amber-500/30">
          Suspended
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status ?? "Unknown"}</Badge>;
  }
}

export function RoleAssignmentCard({
  userId,
  assignment,
  role,
  readOnly = false,
  onEditExpiration,
  onRevoke,
}: RoleAssignmentCardProps) {
  const roleName = role?.name ?? "Unknown Role";
  const roleDescription = role?.description ?? "Role details unavailable";
  const permissionCount = role?.permissionCodes?.length ?? 0;
  const isPermanent = !assignment.expiresAt;
  const status = assignment.status;
  const isActive = status === "ACTIVE";

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-border/80 sm:flex-row sm:items-start">
      <div className="flex min-w-0 gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Shield className="size-5" />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-foreground">{roleName}</h4>
            {getStatusBadge(status)}
            {role?.systemDefined && (
              <Badge variant="outline" className="text-[10px]">
                System Role
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground">{roleDescription}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarClock className="size-3.5 text-muted-foreground" />
              {isPermanent
                ? "Permanent assignment"
                : `Expires ${formatDate(assignment.expiresAt)}`}
            </span>

            <span>•</span>

            <span>
              {permissionCount} permission{permissionCount === 1 ? "" : "s"}
            </span>

            {assignment.assignedAt && (
              <>
                <span>•</span>
                <span>Assigned {formatDate(assignment.assignedAt)}</span>
              </>
            )}

            {assignment.assignedBy && (
              <>
                <span>•</span>
                <span>By: {assignment.assignedBy}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {!readOnly && isActive && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="size-4" />
              <span className="sr-only">Open actions menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => onEditExpiration?.(assignment, role)}
              className="gap-2 cursor-pointer"
            >
              <Edit3 className="size-4 text-muted-foreground" />
              Edit Expiration
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onRevoke?.(assignment, role)}
              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              Revoke Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
