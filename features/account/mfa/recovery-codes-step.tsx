"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface RecoveryCodesStepProps {
    onComplete: () => void;
}

export function RecoveryCodesStep({ onComplete }: RecoveryCodesStepProps) {
    const [acknowledged, setAcknowledged] = useState(false);
    const [copied, setCopied] = useState(false);

    const codes = [
        'ABCD-1234',
        'XZYT-7821',
        'KLMP-9234',
        'QRST-5521',
        'WXYZ-3312',
        'HJKL-8841',
        'UVWX-7729',
        'BCDF-4402',
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(codes.join('\n'));
        setCopied(true);
        toast.success('Recovery codes copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([codes.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'hms-recovery-codes.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Recovery codes downloaded');
    };

    return (
        <div className="space-y-6">
            <div className="space-y-1 text-center">
                <h4 className="font-bold text-base text-foreground">Save Your Recovery Codes</h4>
                <p className="text-xs text-muted-foreground">
                    Store these codes somewhere safe. If you lose your authenticator device, each code can only be used once to regain access.
                </p>
            </div>

            <div className="rounded-xl border bg-muted/40 p-4 font-mono text-sm grid grid-cols-2 gap-2.5 text-center font-bold tracking-wider text-foreground">
                {codes.map((c, i) => (
                    <span key={i} className="bg-background py-1.5 px-3 rounded-lg border shadow-2xs">
                        {c}
                    </span>
                ))}
            </div>

            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} className="flex-1 gap-1.5">
                    <Download className="h-4 w-4" />
                    <span>Download Codes</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1 gap-1.5">
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied' : 'Copy Codes'}</span>
                </Button>
            </div>

            <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                    id="saved-codes"
                    checked={acknowledged}
                    onCheckedChange={(checked) => setAcknowledged(Boolean(checked))}
                />
                <label
                    htmlFor="saved-codes"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer"
                >
                    I have safely stored my backup recovery codes
                </label>
            </div>

            <Button
                disabled={!acknowledged}
                onClick={onComplete}
                className="w-full shadow-xs"
            >
                Complete Setup
            </Button>
        </div>
    );
}
