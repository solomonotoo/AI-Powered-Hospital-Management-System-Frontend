"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '../types/user.types';
import { SectionCard } from '@/features/shared-features/section-card';
import { Smartphone, KeyRound, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface UserMfaTabProps {
    user: User;
}

export function UserMfaTab({ user }: UserMfaTabProps) {
    return (
        <div className="space-y-6">
            {/* MFA Status Card */}
            <SectionCard title="MFA Status">
                <div className="p-4 rounded-xl border bg-card shadow-xs space-y-3">
                    <div className="flex items-center gap-2.5">
                        <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold px-2.5 py-1 text-xs"
                        >
                            ● ENABLED
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        User has mandatory multi-factor authentication protection enabled for clinical and patient data access.
                    </p>
                </div>
            </SectionCard>

            {/* Authentication Methods */}
            <SectionCard title="AUTHENTICATION METHODS">
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Smartphone className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-foreground">Authenticator App</p>
                                    <Badge variant="secondary" className="text-[10px]">Primary</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Enrolled: Aug 10, 2026 • Google / Microsoft Authenticator
                                </p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 w-fit">
                            Active ✓
                        </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <KeyRound className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-foreground">Backup Recovery Codes</p>
                                    <Badge variant="secondary" className="text-[10px]">Available ✓</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Remaining codes: 7 of 10</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success('New recovery codes generated')}
                        >
                            Regenerate
                        </Button>
                    </div>
                </div>
            </SectionCard>

            {/* Admin Actions */}
            <SectionCard title="ADMIN ACTIONS">
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info(`MFA will be required on next login for ${user.name}`)}
                        >
                            <RefreshCw className="h-4 w-4 mr-1.5" />
                            Require MFA on Next Login
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => toast.warning(`MFA has been reset for ${user.name}`)}
                        >
                            Reset MFA
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium border border-amber-500/20">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>Resetting MFA removes all the user&apos;s registered authentication methods. They will be required to re-enroll upon next sign in.</span>
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}
