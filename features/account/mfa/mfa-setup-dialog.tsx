"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Smartphone, CheckCircle2 } from 'lucide-react';
import { QrCodeStep } from './qr-code-step';
import { RecoveryCodesStep } from './recovery-codes-step';
import { toast } from 'sonner';

interface MfaSetupDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function MfaSetupDialog({ open, onOpenChange, onSuccess }: MfaSetupDialogProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const handleVerifyOtp = (code: string) => {
        toast.success('Authenticator code verified!');
        setStep(3);
    };

    const handleFinish = () => {
        toast.success('Multi-Factor Authentication enabled successfully!');
        onOpenChange(false);
        setStep(1);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[460px] p-6">
                <DialogHeader className="text-center space-y-2">
                    <DialogTitle className="text-lg font-bold">Set Up Multi-Factor Authentication</DialogTitle>
                    <div className="flex items-center justify-center gap-2 pt-1 pb-2">
                        <div className={`h-2.5 w-2.5 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                        <div className={`h-1 w-8 transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                        <div className={`h-2.5 w-2.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                        <div className={`h-1 w-8 transition-colors ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
                        <div className={`h-2.5 w-2.5 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Step {step} of 3
                    </span>
                </DialogHeader>

                {step === 1 && (
                    <div className="space-y-6 pt-2">
                        <div className="space-y-1 text-center">
                            <p className="text-xs text-muted-foreground">
                                Protect your account with an additional verification step when signing in to the hospital management system.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Recommended</span>
                            <div className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-xs">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Smartphone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-foreground">Authenticator App</p>
                                        <p className="text-xs text-muted-foreground">Google Authenticator, Microsoft Authenticator or 1Password</p>
                                    </div>
                                </div>
                                <Button size="sm" onClick={() => setStep(2)}>
                                    Select
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="pt-2">
                        <QrCodeStep onVerify={handleVerifyOtp} />
                    </div>
                )}

                {step === 3 && (
                    <div className="pt-2">
                        <RecoveryCodesStep onComplete={handleFinish} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
