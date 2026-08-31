"use client";

import React from 'react';
import { Users, UserCheck, ShieldCheck, Lock } from 'lucide-react';
import { MetricCard } from '@/features/shared-features/metric-card';
import { UserStats } from '../types/user-filters.types';

interface UserSummaryCardsProps {
    stats?: UserStats;
    isLoading?: boolean;
}

export function UserSummaryCards({ stats, isLoading }: UserSummaryCardsProps) {
    const data = stats || {
        total: 248,
        active: 231,
        mfaEnabled: 186,
        locked: 5,
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
                title="Total Users"
                value={data.total}
                icon={Users}
            />
            <MetricCard
                title="Active"
                value={data.active}
                icon={UserCheck}
            />
            <MetricCard
                title="MFA Enabled"
                value={data.mfaEnabled}
                icon={ShieldCheck}
            />
            <MetricCard
                title="Locked / Suspended"
                value={data.locked}
                icon={Lock}
            />
        </div>
    );
}

export const UserStatsCards = UserSummaryCards;
