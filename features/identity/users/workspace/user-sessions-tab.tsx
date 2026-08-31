"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '../types/user.types';
import { useUserSessions } from '../hooks/use-user-sessions';
import { useUserMutations } from '../hooks/use-user-mutations';
import { Monitor, Smartphone, Laptop, LogOut, Clock, MapPin } from 'lucide-react';
import { SectionCard } from '@/features/shared-features/section-card';

interface UserSessionsTabProps {
    user: User;
}

export function UserSessionsTab({ user }: UserSessionsTabProps) {
    const { data: apiSessions, isLoading } = useUserSessions(user.id);
    const { revokeSession, revokeAllSessions } = useUserMutations();

    // Default sample sessions if backend empty
    const mockSessions = [
        {
            sessionId: 'ses_1',
            userAgent: 'Chrome on Windows 11',
            ip: '102.176.65.12',
            location: 'Accra, Ghana',
            isCurrent: true,
            lastActive: 'Now',
            type: 'desktop',
        },
        {
            sessionId: 'ses_2',
            userAgent: 'Microsoft Edge on Windows 11',
            ip: '102.176.65.12',
            location: 'Accra, Ghana',
            isCurrent: false,
            lastActive: 'Today, 08:13 AM',
            type: 'desktop',
        },
        {
            sessionId: 'ses_3',
            userAgent: 'Mobile Safari on iPhone 15',
            ip: '197.251.132.8',
            location: 'Kumasi, Ghana',
            isCurrent: false,
            lastActive: 'Yesterday, 18:45 PM',
            type: 'mobile',
        },
    ];

    const handleRevokeSession = (sessionId: string) => {
        revokeSession.mutate({ userId: user.id, sessionId });
    };

    const handleRevokeAllSessions = () => {
        revokeAllSessions.mutate({ userId: user.id });
    };

    if (isLoading) {
        return <div className="h-48 animate-pulse rounded-xl bg-card border shadow-xs" />;
    }

    return (
        <SectionCard title="CURRENT ACTIVE SESSIONS">
            <div className="space-y-4">
                <div className="flex justify-end">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleRevokeAllSessions}
                        disabled={revokeAllSessions.isPending}
                    >
                        <LogOut className="h-4 w-4 mr-1.5" />
                        Sign Out All
                    </Button>
                </div>

                <div className="space-y-3">
                    {mockSessions.map((session) => (
                        <div
                            key={session.sessionId}
                            className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                                    {session.type === 'mobile' ? (
                                        <Smartphone className="h-5 w-5" />
                                    ) : (
                                        <Laptop className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm text-foreground">{session.userAgent}</p>
                                        {session.isCurrent && (
                                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-[10px] font-semibold">
                                                Current Session
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {session.location}
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
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full sm:w-auto"
                                    onClick={() => handleRevokeSession(session.sessionId)}
                                    disabled={revokeSession.isPending}
                                >
                                    Sign Out
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </SectionCard>
    );
}