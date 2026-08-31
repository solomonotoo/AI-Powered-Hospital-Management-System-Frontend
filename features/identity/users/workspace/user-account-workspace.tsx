"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UserAccountHeader } from './user-account-header';
import { UserOverviewTab } from './user-overview-tab';
import { UserAccessTab } from './user-access-tab';
import { UserAuthenticationTab } from './user-authentication-tab';
import { UserMfaTab } from './user-mfa-tab';
import { UserSessionsTab } from './user-sessions-tab';
import { UserActivityTab } from './user-activity-tab';
import { useUser } from '../hooks/use-user';
import { User } from '../types/user.types';

interface UserAccountWorkspaceProps {
    userId?: string;
    initialTab?: string;
}

export function UserAccountWorkspace({ userId = 'USR-000124', initialTab = 'overview' }: UserAccountWorkspaceProps) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const { data: apiUser, isLoading } = useUser(userId);

    // Fallback/Demo User
    const fallbackUser: User = {
        id: userId,
        name: 'Dr John Mensah',
        email: 'john.mensah@hospital.com',
        role: 'Doctor',
        department: 'Cardiology',
        status: 'active',
        mfaEnabled: true,
        lastLogin: new Date(),
        createdAt: 'August 2026',
    };

    const user: User = apiUser || fallbackUser;

    return (
        <div className="space-y-6">
            <UserAccountHeader
                user={user}
                isLoading={isLoading}
                onEditAccess={() => setActiveTab('access')}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-muted/60 p-1 rounded-xl">
                    <TabsTrigger value="overview" className="text-xs font-semibold">Overview</TabsTrigger>
                    <TabsTrigger value="access" className="text-xs font-semibold">Access & Roles</TabsTrigger>
                    <TabsTrigger value="authentication" className="text-xs font-semibold">Authentication</TabsTrigger>
                    <TabsTrigger value="mfa" className="text-xs font-semibold">MFA</TabsTrigger>
                    <TabsTrigger value="sessions" className="text-xs font-semibold">Sessions</TabsTrigger>
                    <TabsTrigger value="activity" className="text-xs font-semibold">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
                    <UserOverviewTab user={user} onChangeRole={() => setActiveTab('access')} />
                </TabsContent>

                <TabsContent value="access" className="mt-0 focus-visible:outline-none">
                    <UserAccessTab user={user} />
                </TabsContent>

                <TabsContent value="authentication" className="mt-0 focus-visible:outline-none">
                    <UserAuthenticationTab user={user} />
                </TabsContent>

                <TabsContent value="mfa" className="mt-0 focus-visible:outline-none">
                    <UserMfaTab user={user} />
                </TabsContent>

                <TabsContent value="sessions" className="mt-0 focus-visible:outline-none">
                    <UserSessionsTab user={user} />
                </TabsContent>

                <TabsContent value="activity" className="mt-0 focus-visible:outline-none">
                    <UserActivityTab user={user} />
                </TabsContent>
            </Tabs>
        </div>
    );
}