"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Laptop, Smartphone, MapPin, Clock, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function SessionsTab() {
    const [sessions, setSessions] = useState([
        {
            id: 'ses_1',
            device: 'Chrome on Windows 11',
            location: 'Accra, Ghana',
            ip: '102.176.65.12',
            isCurrent: true,
            lastActive: 'Now',
            type: 'desktop',
        },
        {
            id: 'ses_2',
            device: 'Microsoft Edge on Windows 11',
            location: 'Accra, Ghana',
            ip: '102.176.65.12',
            isCurrent: false,
            lastActive: 'Today, 08:13 AM',
            type: 'desktop',
        },
        {
            id: 'ses_3',
            device: 'Mobile Safari on iPhone 15',
            location: 'Kumasi, Ghana',
            ip: '197.251.132.8',
            isCurrent: false,
            lastActive: 'Yesterday, 18:45 PM',
            type: 'mobile',
        },
    ]);

    const handleSignOutOther = () => {
        setSessions(sessions.filter((s) => s.isCurrent));
        toast.success('Signed out of all other sessions');
    };

    const handleRevoke = (id: string) => {
        setSessions(sessions.filter((s) => s.id !== id));
        toast.success('Session terminated');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Active Sessions</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        These devices are currently signed into your hospital management system account.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOutOther} className="gap-1.5 shadow-xs">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out Other Sessions</span>
                </Button>
            </div>

            <div className="space-y-3">
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border bg-card p-5 shadow-xs"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                                {session.type === 'mobile' ? (
                                    <Smartphone className="h-6 w-6" />
                                ) : (
                                    <Laptop className="h-6 w-6" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-sm text-foreground">{session.device}</h4>
                                    {session.isCurrent && (
                                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold text-[10px]">
                                            Current Device
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {session.location} ({session.ip})
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Last active: {session.lastActive}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {!session.isCurrent && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRevoke(session.id)}
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full sm:w-auto"
                            >
                                Sign Out
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
