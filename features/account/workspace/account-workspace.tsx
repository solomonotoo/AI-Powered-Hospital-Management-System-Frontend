"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AccountHeader } from '../components/account-header';
import { AccountNavigation } from '../components/account-navigation';
import { ProfileTab } from '../profile/profile-tab';
import { SecurityTab } from '../security/security-tab';
import { MfaTab } from '../mfa/mfa-tab';
import { SessionsTab } from '../sessions/sessions-tab';
import { NotificationSettings } from '../notifications/notification-settings';

export function AccountWorkspace() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-6">
            <AccountHeader onEditProfile={() => setActiveTab('profile')} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <AccountNavigation />

                <TabsContent value="profile" className="mt-0 focus-visible:outline-none">
                    <ProfileTab />
                </TabsContent>

                <TabsContent value="security" className="mt-0 focus-visible:outline-none">
                    <SecurityTab onNavigateTab={setActiveTab} />
                </TabsContent>

                <TabsContent value="mfa" className="mt-0 focus-visible:outline-none">
                    <MfaTab />
                </TabsContent>

                <TabsContent value="sessions" className="mt-0 focus-visible:outline-none">
                    <SessionsTab />
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 focus-visible:outline-none">
                    <NotificationSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}
