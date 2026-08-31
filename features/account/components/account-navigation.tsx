"use client";

import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AccountNavigation() {
    return (
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-muted/60 p-1 rounded-xl">
            <TabsTrigger value="profile" className="text-xs font-semibold">Profile</TabsTrigger>
            <TabsTrigger value="security" className="text-xs font-semibold">Security</TabsTrigger>
            <TabsTrigger value="mfa" className="text-xs font-semibold">MFA</TabsTrigger>
            <TabsTrigger value="sessions" className="text-xs font-semibold">Sessions</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs font-semibold">Notifications</TabsTrigger>
        </TabsList>
    );
}
