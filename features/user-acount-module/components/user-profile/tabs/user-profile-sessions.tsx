"use client";

import { Badge } from "@/components/ui/badge";
import {
  Monitor,
  Clock,
} from "lucide-react";

interface UserProfileSessionsProps {
  userId?: string;
}

export function UserProfileSessions({ userId: _userId }: UserProfileSessionsProps) {
  // Present clean session state
  const sessions = [
    {
      id: "sess-1",
      device: "Current Browser Session",
      browser: "Chrome on Windows",
      location: "Accra, Ghana",
      ip: "102.176.65.12",
      lastActive: "Active now",
      isCurrent: true,
      valid: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Active Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage authenticated device sessions associated with this account.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Monitor className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">
                    {session.device}
                  </span>
                  {session.isCurrent && (
                    <Badge variant="default" className="bg-emerald-600 text-white text-[11px]">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{session.browser}</span>
                  <span>•</span>
                  <span>{session.location}</span>
                  <span>•</span>
                  <span>{session.ip}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3.5" />
                {session.lastActive}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
