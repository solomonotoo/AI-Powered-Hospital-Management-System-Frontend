"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QrCode, ShieldCheck } from 'lucide-react';

interface QrCodeStepProps {
    onVerify: (code: string) => void;
    isLoading?: boolean;
}

export function QrCodeStep({ onVerify, isLoading }: QrCodeStepProps) {
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`mfa-code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`mfa-code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const isComplete = code.every((c) => c !== '');

    return (
        <div className="space-y-6 text-center">
            <div className="space-y-1">
                <h4 className="font-bold text-base text-foreground">Scan QR Code</h4>
                <p className="text-xs text-muted-foreground">
                    Open your authenticator app (Google Authenticator, Microsoft Authenticator) and scan:
                </p>
            </div>

            {/* QR Code Mock Preview */}
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-2xl border-2 border-primary/20 bg-white p-3 shadow-inner">
                <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 rounded-xl p-2 text-white">
                    <QrCode className="h-28 w-28 text-white animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-300">HMS-SEC-AUTH</span>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground">Enter 6-digit verification code</p>
                <div className="flex justify-center gap-2">
                    {code.map((digit, idx) => (
                        <Input
                            key={idx}
                            id={`mfa-code-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            className="h-12 w-11 text-center font-mono text-lg font-bold shadow-xs bg-muted/40"
                        />
                    ))}
                </div>
            </div>

            <Button
                disabled={!isComplete || isLoading}
                onClick={() => onVerify(code.join(''))}
                className="w-full shadow-xs"
            >
                Verify & Continue
            </Button>
        </div>
    );
}
