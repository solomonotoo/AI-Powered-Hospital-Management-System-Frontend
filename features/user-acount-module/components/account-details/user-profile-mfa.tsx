"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Key,
  RefreshCw,
  Lock,
  Unlock,
} from "lucide-react";

interface UserProfileMFAProps {
  userId?: string;
}

export function UserProfileMFA({ userId }: UserProfileMFAProps) {
  // Mock data - replace with actual data from your backend
  const mfaMethods = [
    {
      id: "authenticator",
      name: "Authenticator App",
      status: "enabled",
      description: "Google Authenticator, Microsoft Authenticator, etc.",
      lastUsed: "Today, 09:42 AM",
    },
    {
      id: "sms",
      name: "SMS Verification",
      status: "disabled",
      description: "Receive verification codes via SMS",
      lastUsed: "Never",
    },
    {
      id: "email",
      name: "Email Verification",
      status: "enabled",
      description: "Receive verification codes via email",
      lastUsed: "2 days ago",
    },
  ];

  const backupCodes = [
    { code: "XXXX-XXXX-XXXX", used: false },
    { code: "YYYY-YYYY-YYYY", used: false },
    { code: "ZZZZ-ZZZZ-ZZZZ", used: true },
    { code: "AAAA-AAAA-AAAA", used: false },
    { code: "BBBB-BBBB-BBBB", used: false },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Multi-Factor Authentication
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage MFA methods and backup codes
          </p>
        </div>
        <Button className="gap-1.5 shadow-sm hover:shadow-md transition-all">
          <QrCode className="h-4 w-4" />
          Setup New Method
        </Button>
      </div>

      {/* MFA Status */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  MFA Status
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="gap-1.5 bg-emerald-500 text-white">
                    <CheckCircle className="h-3 w-3" />
                    Protected
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    2 methods enabled
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate Codes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MFA Methods */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Configured Methods
          </h4>
          <div className="space-y-3">
            {mfaMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      method.status === "enabled"
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-400"
                    }`}
                  >
                    {method.id === "authenticator" && (
                      <Smartphone className="h-4 w-4" />
                    )}
                    {method.id === "sms" && <Key className="h-4 w-4" />}
                    {method.id === "email" && <Shield className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {method.name}
                      </p>
                      {method.status === "enabled" ? (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Enabled
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400 text-xs"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Disabled
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
                    Last used
                  </p>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    {method.lastUsed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup Codes */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Backup Codes
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Use these codes if you lose access to your MFA device
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Generate New Codes
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {backupCodes.map((code, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  code.used
                    ? "bg-slate-100 dark:bg-slate-700/30 text-slate-400"
                    : "bg-white dark:bg-slate-800/50"
                }`}
              >
                <span className="font-mono text-sm text-slate-900 dark:text-white">
                  {code.code}
                </span>
                {code.used && (
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-300 text-slate-500"
                  >
                    Used
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Keep these codes secure. Do not share them with anyone.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
