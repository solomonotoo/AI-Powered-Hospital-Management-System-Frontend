"use client";

import React from 'react';
import { User } from '../types/user.types';
import { SectionCard } from '@/features/shared-features/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ShieldCheck, Clock, MapPin, Laptop, KeyRound, AlertCircle } from 'lucide-react';

interface UserOverviewTabProps {
    user: User;
    onChangeRole?: () => void;
}

export function UserOverviewTab({ user, onChangeRole }: UserOverviewTabProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Status Card */}
            <SectionCard title="ACCOUNT STATUS">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold text-foreground capitalize">{String(user.status)}</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Account created: <span className="font-medium text-foreground">{user.createdAt || 'August 2026'}</span></p>
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Email verified</span>
                        </div>
                    </div>
                </div>
            </SectionCard>

            {/* Login Activity Card */}
            <SectionCard title="LOGIN ACTIVITY">
                <div className="space-y-3">
                    <div>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Last Login</span>
                        <p className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Today, 09:42 AM</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Accra, Ghana</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Laptop className="h-4 w-4 text-muted-foreground" />
                            <span>Chrome • Windows 11</span>
                        </div>
                    </div>
                </div>
            </SectionCard>

            {/* Primary Role Card */}
            <SectionCard title="PRIMARY ROLE">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-bold text-foreground">{user.role || 'Doctor'}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Primary access role for clinical and administrative operations
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onChangeRole}>
                        Change Role
                    </Button>
                </div>
            </SectionCard>

            {/* Security Summary Card */}
            <SectionCard title="SECURITY">
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-1 border-b">
                        <span className="text-muted-foreground">MFA Status</span>
                        {user.mfaEnabled ? (
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold gap-1">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                <span>Enabled ✓</span>
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                Disabled
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center justify-between py-1 border-b">
                        <span className="text-muted-foreground">Password updated</span>
                        <span className="font-medium text-foreground">32 days ago</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                        <span className="text-muted-foreground">Failed login attempts</span>
                        <span className="font-medium text-foreground">0</span>
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}
