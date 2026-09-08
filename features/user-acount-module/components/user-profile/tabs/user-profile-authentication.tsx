"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KeyRound, ShieldCheck, Mail, CheckCircle, AlertTriangle } from "lucide-react";
import { UserSummaryResponse } from "@/features/user-acount-module/types/users";

interface UserProfileAuthenticationProps {
  userId: string;
  user?: UserSummaryResponse | null;
}

export function UserProfileAuthentication({
  userId,
  user,
}: UserProfileAuthenticationProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Authentication & Credentials
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage login credentials, password policies, and security factors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Password Status */}
        <Card className="border bg-card shadow-sm">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <KeyRound className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Password</h4>
                  <p className="text-xs text-muted-foreground">Primary login factor</p>
                </div>
              </div>
              {user?.mustChangePassword ? (
                <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-xs">
                  Reset Required
                </Badge>
              ) : (
                <Badge variant="default" className="bg-emerald-600 text-white text-xs">
                  Active
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground pt-1">
              {user?.mustChangePassword
                ? "User is required to choose a new password upon their next sign in."
                : "Standard password authentication is active for this account."}
            </p>
          </CardContent>
        </Card>

        {/* Email Verification */}
        <Card className="border bg-card shadow-sm">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <Mail className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Login Email</h4>
                  <p className="text-xs text-muted-foreground">Notification and sign-in handle</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                Verified
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground pt-1 truncate">
              {user?.loginEmail || "Email associated with user credentials"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
