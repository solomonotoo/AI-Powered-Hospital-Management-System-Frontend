"use client";

import React from 'react';
import { User } from '../types/user.types';
import { useUserActivity } from '../hooks/use-user-activity';
import { Activity, Clock, ShieldCheck, KeyRound, LogIn, Laptop, Smartphone } from 'lucide-react';
import { SectionCard } from '@/features/shared-features/section-card';
import { Badge } from '@/components/ui/badge';

interface UserActivityTabProps {
    user: User;
}

export function UserActivityTab({ user }: UserActivityTabProps) {
    const { data: apiActivity, isLoading } = useUserActivity(user.id);

    const mockActivities = [
        {
            id: 'act_1',
            type: 'LOGIN_SUCCESS',
            title: 'Successful Sign In',
            description: 'Authenticated via Email + Authenticator App OTP',
            timestamp: 'Today, 09:42 AM',
            ip: '102.176.65.12',
            location: 'Accra, Ghana',
            icon: LogIn,
            color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
        },
        {
            id: 'act_2',
            type: 'ROLE_ASSIGNED',
            title: 'Role Assignment Modified',
            description: 'Assigned to role DOCTOR by Administrator (USR-000001)',
            timestamp: 'Aug 21, 2026, 14:10 PM',
            ip: '102.176.65.1',
            location: 'Accra, Ghana',
            icon: ShieldCheck,
            color: 'text-primary bg-primary/10',
        },
        {
            id: 'act_3',
            type: 'MFA_VERIFIED',
            title: 'MFA Enrollment Completed',
            description: 'Registered Google Authenticator as primary 2FA method',
            timestamp: 'Aug 10, 2026, 11:30 AM',
            ip: '102.176.65.12',
            location: 'Accra, Ghana',
            icon: Smartphone,
            color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/30',
        },
        {
            id: 'act_4',
            type: 'PASSWORD_RESET',
            title: 'Password Updated',
            description: 'Password changed successfully after initial temporary password',
            timestamp: 'July 21, 2026, 16:22 PM',
            ip: '102.176.65.12',
            location: 'Accra, Ghana',
            icon: KeyRound,
            color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
        },
    ];

    if (isLoading) {
        return <div className="h-48 animate-pulse rounded-xl bg-card border shadow-xs" />;
    }

    return (
        <SectionCard title="Security & Activity Audit Trail">
            <div className="space-y-4">
                {mockActivities.map((act) => {
                    const Icon = act.icon;
                    return (
                        <div
                            key={act.id}
                            className="flex items-start gap-4 rounded-xl border bg-card p-4 shadow-xs"
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${act.color}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="font-semibold text-sm text-foreground">{act.title}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{act.timestamp}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">{act.description}</p>
                                <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground font-mono">
                                    <span>IP: {act.ip}</span>
                                    <span>•</span>
                                    <span>{act.location}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
}