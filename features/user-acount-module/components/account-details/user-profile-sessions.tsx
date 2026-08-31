"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Monitor,
  Smartphone,
  Apple,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  AlertTriangle,
} from "lucide-react";

interface UserProfileSessionsProps {
  userId?: string;
}

export function UserProfileSessions({ userId }: UserProfileSessionsProps) {
  // Mock data - replace with actual data from your backend
  const sessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      browser: "Chrome 120",
      os: "Windows 11",
      location: "Accra, Ghana",
      ip: "192.168.1.1",
      lastActive: "Active now",
      status: "active",
      isCurrent: true,
    },
    {
      id: 2,
      device: "Safari on iOS",
      browser: "Safari 17",
      os: "iOS 17.2",
      location: "Kumasi, Ghana",
      ip: "192.168.1.2",
      lastActive: "2 hours ago",
      status: "active",
      isCurrent: false,
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      browser: "Firefox 121",
      os: "MacOS Sonoma",
      location: "Takoradi, Ghana",
      ip: "192.168.1.3",
      lastActive: "3 days ago",
      status: "inactive",
      isCurrent: false,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Active Sessions
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage active and recent sessions
          </p>
        </div>
        <Button
          variant="destructive"
          className="gap-1.5 shadow-sm hover:shadow-md transition-all"
        >
          <LogOut className="h-4 w-4" />
          Log Out All Devices
        </Button>
      </div>

      {/* Sessions List */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                  session.isCurrent
                    ? "bg-indigo-50 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-800"
                    : "bg-white dark:bg-slate-800/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-xl ${
                      session.isCurrent
                        ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {session.os.includes("Windows") && (
                      <Monitor className="h-5 w-5" />
                    )}
                    {session.os.includes("iOS") && (
                      <Smartphone className="h-5 w-5" />
                    )}
                    {session.os.includes("MacOS") && (
                      <Apple className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {session.device}
                      </p>
                      {session.isCurrent && (
                        <Badge className="gap-1 bg-indigo-500 text-white text-xs">
                          <CheckCircle className="h-3 w-3" />
                          Current Session
                        </Badge>
                      )}
                      {session.status === "active" && !session.isCurrent && (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                      {session.status === "inactive" && (
                        <Badge
                          variant="outline"
                          className="border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400 text-xs"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {session.location}
                      </span>
                      <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                      <span className="font-mono">{session.ip}</span>
                      <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last active: {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Log Out
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Alert */}
      <Card className="border-0 shadow-sm bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Security Recommendation
              </h5>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Log out of inactive or unrecognized sessions to maintain account
                security. Your current session is active and secure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
