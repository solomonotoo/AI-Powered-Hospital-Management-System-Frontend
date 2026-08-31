"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Key,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Shield,
  Mail,
  Smartphone,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

interface UserProfileAuthenticationProps {
  userId?: string;
}

export function UserProfileAuthentication({ userId }: UserProfileAuthenticationProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Mock data - replace with actual data from your backend
  const authMethods = [
    { 
      id: "password", 
      name: "Password", 
      status: "active", 
      lastUpdated: "32 days ago",
      description: "Used for standard login"
    },
    { 
      id: "email", 
      name: "Email Verification", 
      status: "verified", 
      lastUpdated: "Jan 2026",
      description: "2-factor authentication via email"
    },
    { 
      id: "sms", 
      name: "SMS 2FA", 
      status: "pending", 
      lastUpdated: "Not set up",
      description: "Phone number verification"
    },
  ];

  const loginHistory = [
    { date: "Today, 09:42 AM", ip: "192.168.1.1", device: "Chrome • Windows", location: "Accra, Ghana", status: "success" },
    { date: "Yesterday, 06:15 PM", ip: "192.168.1.2", device: "Firefox • MacOS", location: "Kumasi, Ghana", status: "success" },
    { date: "2 days ago, 08:30 AM", ip: "192.168.1.3", device: "Safari • iOS", location: "Takoradi, Ghana", status: "failed" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Authentication
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage authentication methods and security settings
          </p>
        </div>
        <Button className="gap-1.5 shadow-sm hover:shadow-md transition-all">
          <RefreshCw className="h-4 w-4" />
          Update Security
        </Button>
      </div>

      {/* Authentication Methods */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Authentication Methods
          </h4>
          <div className="space-y-3">
            {authMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    method.status === "active" || method.status === "verified"
                      ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                      : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                  }`}>
                    {method.id === "password" && <Key className="h-4 w-4" />}
                    {method.id === "email" && <Mail className="h-4 w-4" />}
                    {method.id === "sms" && <Smartphone className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {method.name}
                      </p>
                      {method.status === "active" && (
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                      {method.status === "verified" && (
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {method.status === "pending" && (
                        <Badge variant="outline" className="border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400 text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Last updated
                  </p>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    {method.lastUpdated}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password Reset Section */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Reset Password
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Send a password reset link to the user's email
              </p>
            </div>
            <Button variant="outline" className="gap-1.5 shadow-sm hover:shadow-md transition-all">
              <RefreshCw className="h-3.5 w-3.5" />
              Send Reset Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Recent Login History
            </h4>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {loginHistory.map((login, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${
                    login.status === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                  }`}>
                    {login.status === "success" ? (
                      <CheckCircle className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {login.date}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {login.device} • {login.location}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {login.ip}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}