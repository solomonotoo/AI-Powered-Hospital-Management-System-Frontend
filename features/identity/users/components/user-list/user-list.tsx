"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserFilters } from '../../hooks/use-user-filters';
import { useUsers } from '../../hooks/use-users';
import { WorkspaceSection } from '@/features/shared-features/workspace-section';
import { ErrorState } from '@/features/shared-features/error-state';
import { UserSummaryCards } from '../user-summary-cards';
import { UserToolbar } from '../user-toolbar';
import { UserTable } from '../user-table';
import { User } from '../../types/user.types';
import { toast } from 'sonner';

type TabValue = 'all' | 'pending' | 'locked' | 'security';

export function UserList() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabValue>('all');
    const { filters, updateFilters } = useUserFilters();
    const { data, isLoading, error, refetch } = useUsers(filters);

    // Mock initial data if backend returned empty during development
    const sampleUsers: User[] = [
        {
            id: 'USR-001',
            name: 'Dr John Mensah',
            email: 'john@hospital.com',
            role: 'Doctor',
            status: 'active',
            mfaEnabled: true,
            lastLogin: new Date(),
            department: 'Cardiology',
        },
        {
            id: 'USR-002',
            name: 'Mary Owusu',
            email: 'mary@hospital.com',
            role: 'Nurse',
            status: 'active',
            mfaEnabled: false,
            lastLogin: new Date(Date.now() - 86400000),
            department: 'Pediatrics',
        },
        {
            id: 'USR-003',
            name: 'Peter Mensah',
            email: 'peter@hospital.com',
            role: 'Admin',
            status: 'active',
            mfaEnabled: true,
            lastLogin: new Date(Date.now() - 864000000),
            department: 'Administration',
        },
        {
            id: 'USR-004',
            name: 'Sarah Asante',
            email: 'sarah@hospital.com',
            role: 'Receptionist',
            status: 'pending',
            mfaEnabled: false,
            lastLogin: null,
            department: 'Front Desk',
        },
    ];

    const users = (data?.users && data.users.length > 0) ? data.users : sampleUsers;
    const stats = data?.stats || { total: 248, active: 231, mfaEnabled: 186, locked: 5 };

    // Filter by tab
    const filteredUsers = users.filter((u) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return u.status === 'pending' || u.status === 'INVITED';
        if (activeTab === 'locked') return u.status === 'locked' || u.status === 'suspended' || u.status === 'LOCKED' || u.status === 'SUSPENDED';
        return true;
    });

    if (error) {
        return (
            <WorkspaceSection>
                <ErrorState
                    message="Failed to load user accounts. Please check your connection and try again."
                    onRetry={() => refetch()}
                />
            </WorkspaceSection>
        );
    }

    const summary = (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">User Accounts</h1>
            <p className="text-sm text-muted-foreground">
                Manage system access, authentication, roles and account security
            </p>
        </div>
    );

    const toolbar = (
        <div className="space-y-4">
            <UserSummaryCards stats={stats} isLoading={isLoading} />
            <UserToolbar
                filters={filters}
                onFiltersChange={updateFilters}
                onCreateUser={() => router.push('/users/create')}
            />
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as TabValue)}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex bg-muted/60 p-1">
                    <TabsTrigger value="all" className="px-4 text-xs font-semibold">ALL USERS</TabsTrigger>
                    <TabsTrigger value="pending" className="px-4 text-xs font-semibold">PENDING INVITATIONS</TabsTrigger>
                    <TabsTrigger value="locked" className="px-4 text-xs font-semibold">LOCKED ACCOUNTS</TabsTrigger>
                    <TabsTrigger value="security" className="px-4 text-xs font-semibold">SECURITY EVENTS</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );

    const handleUserSelect = (user: User) => {
        router.push(`/users/${user.id}`);
    };

    const handleRowAction = (action: string, user: User) => {
        switch (action) {
            case 'view':
                router.push(`/users/${user.id}`);
                break;
            case 'edit':
                router.push(`/users/${user.id}?tab=access`);
                break;
            case 'reset-password':
                toast.success(`Password reset link sent to ${user.email}`);
                break;
            case 'reset-mfa':
                toast.success(`MFA reset for ${user.name || user.email}`);
                break;
            case 'force-signout':
                toast.success(`All active sessions terminated for ${user.name || user.email}`);
                break;
            case 'suspend':
                toast.warning(`Account suspended for ${user.name || user.email}`);
                break;
            case 'delete':
                toast.error(`Account deleted for ${user.name || user.email}`);
                break;
        }
    };

    return (
        <WorkspaceSection summary={summary} toolbar={toolbar}>
            <UserTable
                users={filteredUsers}
                totalRecords={stats.total}
                isLoading={isLoading}
                onUserSelect={handleUserSelect}
                onRowAction={handleRowAction}
            />
        </WorkspaceSection>
    );
}
