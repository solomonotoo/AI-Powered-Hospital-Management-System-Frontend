"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Mail,
  Hash,
  User as UserIcon,
  Calendar,
  CheckCircle,
  Clock,
  KeyRound,
  AlertTriangle,
} from "lucide-react";
import { UserSummaryResponse } from "@/features/user-acount-module/types/users";
import { useUserAccess } from "@/features/user-acount-module/hook/use-user-access";

interface UserProfileOverviewProps {
  user?: UserSummaryResponse | null;
  userId: string;
}

function formatDateTime(isoString?: string): string {
  if (!isoString) return "Never";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function UserProfileOverview({ user, userId }: UserProfileOverviewProps) {
  const { data: access } = useUserAccess(userId);

  const activeRoles = (access?.roles ?? []).filter((r) => r.status === "ACTIVE");
  const permissionsCount = access?.permissions?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Status Card */}
        <Card className="border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Account Status
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <CheckCircle className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                {user?.status ? user.status.replace(/_/g, " ") : "Active"}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              User has valid system access credentials
            </p>
          </CardContent>
        </Card>

        {/* Roles Card */}
        <Card className="border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Roles
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {activeRoles.length}
              </span>
              <span className="text-xs text-muted-foreground">role assignments</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {user?.staffRole ? `Primary: ${user.staffRole}` : "Governs module access"}
            </p>
          </CardContent>
        </Card>

        {/* Permissions Card */}
        <Card className="border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Permissions
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <KeyRound className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {permissionsCount}
              </span>
              <span className="text-xs text-muted-foreground">capabilities</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Inherited across active role assignments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account Details Section */}
      <Card className="border bg-card shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-base font-semibold text-foreground">Account Information</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">
            Detailed profile information and system identifiers.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <UserIcon className="size-3.5" /> Full Name
              </span>
              <p className="text-sm font-medium text-foreground">
                {user?.fullName || "—"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Mail className="size-3.5" /> Login Email
              </span>
              <p className="text-sm font-medium text-foreground">
                {user?.loginEmail || "—"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Hash className="size-3.5" /> Staff Identifier
              </span>
              <p className="font-mono text-sm font-medium text-foreground">
                {user?.staffId || "—"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Shield className="size-3.5" /> Staff Role
              </span>
              <p className="text-sm font-medium text-foreground">
                {user?.staffRole || "Not assigned"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="size-3.5" /> Last Login
              </span>
              <p className="text-sm font-medium text-foreground">
                {formatDateTime(user?.lastLoginAt)}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <AlertTriangle className="size-3.5" /> Password Reset Status
              </span>
              <p className="text-sm font-medium">
                {user?.mustChangePassword ? (
                  <Badge variant="outline" className="text-amber-600 border-amber-500/30">
                    Password Reset Required
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">Standard</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
