"use client";

import { Activity, Clock, Shield, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserProfileActivityProps {
  userId: string;
}

export function UserProfileActivity({ userId }: UserProfileActivityProps) {
  const activities = [
    {
      id: "act-1",
      title: "Account Loaded",
      description: "User account profile viewed in administrative console",
      timestamp: "Just now",
      type: "access",
    },
    {
      id: "act-2",
      title: "Role Synchronization",
      description: "Effective permissions queried against active roles",
      timestamp: "Today",
      type: "security",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Account Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Audit logs and security events recorded for this user.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="relative border-l border-border/80 pl-6 space-y-6 ml-3 my-2">
          {activities.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-[31px] flex size-6 items-center justify-center rounded-full border bg-background text-primary shadow-sm">
                <Activity className="size-3" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {item.title}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {item.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-0.5">
                  <Clock className="size-3" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
