"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  UserPlus,
  UserMinus,
  Shield,
  FileText,
  Settings,
  LogIn,
  LogOut,
  Filter,
  Download,
} from "lucide-react";

interface UserProfileActivityProps {
  userId?: string;
}

export function UserProfileActivity({ userId }: UserProfileActivityProps) {
  // Mock data - replace with actual data from your backend
  const activities = [
    {
      id: 1,
      action: "Login",
      description: "User logged in successfully",
      timestamp: "Today, 09:42 AM",
      status: "success",
      icon: LogIn,
      details: "IP: 192.168.1.1 • Chrome on Windows",
    },
    {
      id: 2,
      action: "Profile Update",
      description: "User updated profile information",
      timestamp: "Today, 08:15 AM",
      status: "success",
      icon: Edit,
      details: "Updated email and phone number",
    },
    {
      id: 3,
      action: "Password Change",
      description: "User changed password",
      timestamp: "Yesterday, 04:20 PM",
      status: "success",
      icon: Shield,
      details: "Password last updated 32 days ago",
    },
    {
      id: 4,
      action: "Failed Login Attempt",
      description: "Failed login attempt detected",
      timestamp: "Yesterday, 03:10 PM",
      status: "failed",
      icon: LogIn,
      details: "IP: 192.168.1.3 • Incorrect password",
    },
    {
      id: 5,
      action: "MFA Enabled",
      description: "Multi-factor authentication enabled",
      timestamp: "2 days ago, 10:30 AM",
      status: "success",
      icon: Shield,
      details: "Authenticator app configured",
    },
    {
      id: 6,
      action: "Logout",
      description: "User logged out",
      timestamp: "2 days ago, 09:00 AM",
      status: "success",
      icon: LogOut,
      details: "Session ended successfully",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />;
      case "failed":
        return <XCircle className="h-3.5 w-3.5 text-red-500" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-400 text-xs"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400 text-xs"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Activity Log
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View all user activities and events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total Activities
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  156
                </p>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Activity className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Successful
                </p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  142
                </p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Failed
                </p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  14
                </p>
              </div>
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity List */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 bg-white dark:bg-slate-800/50 rounded-lg hover:shadow-sm transition-all"
                >
                  <div
                    className={`p-2 rounded-xl ${
                      activity.status === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {activity.action}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </span>
                      <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.details}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(activity.status)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              Load More Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
