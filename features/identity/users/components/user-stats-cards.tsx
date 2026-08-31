import React from 'react';
import { Users, UserCheck, ShieldCheck, Lock } from 'lucide-react';
import { MetricCard } from '@/features/shared-features/metric-card';
import { UserStats } from '../types/user-filters.types';

interface UserStatsCardsProps {
  stats?: UserStats;
  isLoading?: boolean;
}

export function UserStatsCards({ stats, isLoading }: UserStatsCardsProps) {
  const data = stats || {
    total: 0,
    active: 0,
    mfaEnabled: 0,
    locked: 0,
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

export const UserSummaryCards = UserStatsCards;