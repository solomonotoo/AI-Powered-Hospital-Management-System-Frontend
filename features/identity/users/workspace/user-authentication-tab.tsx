"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '../types/user.types';
import { SectionCard } from '@/features/shared-features/section-card';
import { CheckCircle2, KeyRound, Mail, ShieldAlert, Lock, RefreshCw, UserX } from 'lucide-react';
import { toast } from 'sonner';

interface UserAuthenticationTabProps {
    user: User;
}

export function UserAuthenticationTab({ user }: UserAuthenticationTabProps) {
    return (
        <div className="space-y-6">
            {/* Email Address Section */}
            <SectionCard title="Email Address">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm text-foreground">{user.email || 'john.mensah@hospital.com'}</p>
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 gap-1 text-[11px] font-semibold">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Verified</span>
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">Used for authentication, notifications and recovery</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info('Change email modal')}>
                        Change Email
                    </Button>
                </div>
            </SectionCard>

            {/* Password Section */}
            <SectionCard title="Password">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <KeyRound className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-foreground">Account Password</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Last changed: July 21, 2026</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast.success(`Password reset email sent to ${user.email}`)}
                    >
                        Send Password Reset
                    </Button>
                </div>
            </SectionCard>

            {/* Account Protection Card */}
            <SectionCard title="Account Protection">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Failed login attempts</p>
                        <p className="text-xl font-bold text-foreground">0</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account lock status</p>
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Not locked</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Last failed login</p>
                        <p className="text-sm font-medium text-muted-foreground">—</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Last successful login</p>
                        <p className="text-sm font-semibold text-foreground">Today, 09:42 AM</p>
                    </div>
                </div>
            </SectionCard>

            {/* Danger Zone */}
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-4">
                <div className="flex items-center gap-2 text-destructive font-semibold">
                    <ShieldAlert className="h-5 w-5" />
                    <h3 className="text-base tracking-tight">DANGER ZONE</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                    Restricted administrative actions that directly affect user authentication and access.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive/40 text-destructive hover:bg-destructive/10"
                        onClick={() => toast.warning(`Account locked for ${user.name}`)}
                    >
                        <Lock className="h-4 w-4 mr-1.5" />
                        Lock Account
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive/40 text-destructive hover:bg-destructive/10"
                        onClick={() => toast.info(`Forced password reset triggered for ${user.name}`)}
                    >
                        <RefreshCw className="h-4 w-4 mr-1.5" />
                        Force Password Reset
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => toast.error(`Account suspended for ${user.name}`)}
                    >
                        <UserX className="h-4 w-4 mr-1.5" />
                        Suspend Account
                    </Button>
                </div>
            </div>
        </div>
    );
}
