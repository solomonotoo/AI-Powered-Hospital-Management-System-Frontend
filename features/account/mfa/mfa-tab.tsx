"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Smartphone, KeyRound, CheckCircle2, Plus } from 'lucide-react';
import { MfaSetupDialog } from './mfa-setup-dialog';
import { toast } from 'sonner';

export function MfaTab() {
    const [mfaEnabled, setMfaEnabled] = useState(true);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Multi-Factor Authentication</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Add an extra layer of security to prevent unauthorized access to clinical and patient data.
                </p>
            </div>

            {/* Current MFA Status */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-base text-foreground">Authentication Status</h3>
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold text-xs">
                                    ● ENABLED
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your account is currently protected with a Time-based One-Time Password (TOTP) app.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsWizardOpen(true)}
                        className="shadow-xs"
                    >
                        Reconfigure MFA
                    </Button>
                </div>
            </div>

            {/* Registered Methods */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">REGISTERED METHODS</h3>

                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border bg-card p-4 shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Smartphone className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-foreground">Authenticator App</p>
                                    <Badge variant="secondary" className="text-[10px]">Primary</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Google Authenticator • Enrolled Aug 10, 2026</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 w-fit">
                            Active ✓
                        </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border bg-card p-4 shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <KeyRound className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-foreground">Backup Recovery Codes</p>
                                    <Badge variant="secondary" className="text-[10px]">Backup</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">7 codes remaining of 10 generated</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success('New recovery codes generated')}
                        >
                            Regenerate Codes
                        </Button>
                    </div>
                </div>
            </div>

            <MfaSetupDialog
                open={isWizardOpen}
                onOpenChange={setIsWizardOpen}
                onSuccess={() => setMfaEnabled(true)}
            />
        </div>
    );
}
