"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Smartphone, CheckCircle2 } from "lucide-react";
import { UserSummaryResponse } from "@/features/user-acount-module/types/users";

interface UserProfileMFAProps {
  userId: string;
  user?: UserSummaryResponse | null;
}

export function UserProfileMFA({ userId, user }: UserProfileMFAProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Multi-Factor Authentication (MFA)
          </h2>
          <p className="text-sm text-muted-foreground">
            Enhance account security with secondary verification factors.
          </p>
        </div>
      </div>

      <Card className="border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-foreground">
                  Two-Factor Authentication
                </h4>
                <Badge variant="outline" className="text-xs">
                  Available
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Multi-Factor Authentication adds an extra layer of protection by requiring a temporary verification code in addition to standard credentials when signing in.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
