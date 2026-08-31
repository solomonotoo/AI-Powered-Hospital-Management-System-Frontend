"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Activity,
  Mail,
  Hash,
  User,
  Stethoscope,
  MapPin,
  Home,
  Calendar,
  Edit,
  Lock,
  Key,
  Smartphone,
  Globe,
  Users,
  FileText,
} from "lucide-react";

interface UserProfileOverviewProps {
  userData?: {
    name: string;
    email: string;
    userId: string;
    role: string;
    department: string;
    specialty: string;
    status: "active" | "inactive" | "suspended";
    avatar?: string;
    createdAt: string;
    lastLogin: string;
    location: string;
    device: string;
    emailVerified: boolean;
    mfaEnabled: boolean;
    passwordLastUpdated: string;
    failedAttempts: number;
  };
}

export function UserProfileOverview({
  userData = {
    name: "Dr. John Mensah",
    email: "john.mensah@hospital.com",
    userId: "USR-000124",
    role: "Doctor",
    department: "Clinical Department",
    specialty: "Cardiology",
    status: "active",
    createdAt: "Aug 2026",
    lastLogin: "Today, 09:42",
    location: "Accra, Ghana",
    device: "Chrome • Windows",
    emailVerified: true,
    mfaEnabled: true,
    passwordLastUpdated: "32 days ago",
    failedAttempts: 0,
  },
}: UserProfileOverviewProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        className:
          "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400",
        text: "ACTIVE",
        icon: CheckCircle,
      },
      inactive: {
        className:
          "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400",
        text: "INACTIVE",
        icon: AlertCircle,
      },
      suspended: {
        className:
          "border-red-200 text-red-700 dark:border-red-800 dark:text-red-400",
        text: "SUSPENDED",
        icon: XCircle,
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`gap-1.5 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const StatCard = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </h4>
          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Overview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Overview
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            User profile summary and account details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Status */}
        <StatCard title="Account Status" icon={Shield}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getStatusBadge(userData.status)}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                Created {userData.createdAt}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-400">
                Email verified
              </span>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
        </StatCard>

        {/* Login Activity */}
        <StatCard title="Login Activity" icon={Activity}>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last login
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {userData.lastLogin}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {userData.location}
              </span>
              <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
              <span className="flex items-center gap-1">
                <Home className="h-3 w-3" />
                {userData.device}
              </span>
            </div>
          </div>
        </StatCard>

        {/* Primary Role */}
        <StatCard title="Primary Role" icon={User}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <Stethoscope className="h-3 w-3" />
                {userData.role}
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <FileText className="h-3 w-3" />
                {userData.specialty}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              <Users className="h-3.5 w-3.5" />
              {userData.department}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-7 px-3"
            >
              <Edit className="h-3 w-3" />
              Change Role
            </Button>
          </div>
        </StatCard>

        {/* Security */}
        <StatCard title="Security" icon={Lock}>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">MFA</span>
              <Badge
                variant="outline"
                className="gap-1.5 border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
              >
                <CheckCircle className="h-3 w-3" />
                {userData.mfaEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Password updated</span>
              <span>{userData.passwordLastUpdated}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Failed attempts</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {userData.failedAttempts}
              </span>
            </div>
          </div>
        </StatCard>
      </div>

      {/* Additional Information */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-800/50">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {userData.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-800/50">
              <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <Hash className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  User ID
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white font-mono">
                  {userData.userId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-800/50">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Location
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {userData.location}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-2">
          Quick Actions:
        </span>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 shadow-sm hover:shadow-md transition-all"
        >
          <Key className="h-3.5 w-3.5" />
          Reset Password
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 shadow-sm hover:shadow-md transition-all"
        >
          <Smartphone className="h-3.5 w-3.5" />
          Setup MFA
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 shadow-sm hover:shadow-md transition-all text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
        >
          <XCircle className="h-3.5 w-3.5" />
          Deactivate Account
        </Button>
      </div>
    </div>
  );
}
