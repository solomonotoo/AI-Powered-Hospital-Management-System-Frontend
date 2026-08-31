"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KeyRound, ShieldCheck, Laptop, History, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface SecurityTabProps {
    onNavigateTab?: (tab: string) => void;
}

export function SecurityTab({ onNavigateTab }: SecurityTabProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Security</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Manage your account credentials, multi-factor protection, and sign-in sessions.
                </p>
            </div>

            <div className="space-y-4">
                {/* Password Card */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">PASSWORD</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <KeyRound className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">Account Password</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Last changed 32 days ago</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info('Change password modal')}
                            className="shadow-xs"
                        >
                            Change Password
                        </Button>
                    </div>
                </div>

                {/* MFA Card */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">MULTI-FACTOR AUTHENTICATION</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-foreground">Multi-Factor Authentication</p>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold text-[11px]">
                                        ● Enabled
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Your account is protected with an authenticator app.</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigateTab?.('mfa')}
                            className="shadow-xs"
                        >
                            Manage MFA
                        </Button>
                    </div>
                </div>

                {/* Active Sessions Card */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ACTIVE SESSIONS</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                                <Laptop className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">Active Browser Sessions</p>
                                <p className="text-xs text-muted-foreground mt-0.5">3 active sessions across desktop and mobile devices</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigateTab?.('sessions')}
                            className="shadow-xs"
                        >
                            Manage Sessions
                        </Button>
                    </div>
                </div>

                {/* Account Activity Card */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ACCOUNT ACTIVITY</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                                <History className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">Recent Security Events & Login History</p>
                                <p className="text-xs text-muted-foreground mt-0.5">View audit trails of recent sign-ins and security changes</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info('Activity history log')}
                            className="shadow-xs"
                        >
                            View Activity
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
