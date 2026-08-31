"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Shield, Mail, Smartphone, Save } from 'lucide-react';
import { toast } from 'sonner';

export function NotificationSettings() {
    const [settings, setSettings] = useState({
        securityAlerts: true,
        patientUpdates: true,
        loginAlerts: true,
        weeklyDigest: false,
        smsEmergency: true,
    });

    const handleSave = () => {
        toast.success('Notification preferences updated');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Notification Preferences</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Configure which alerts and security notifications you receive.
                </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6">
                <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4 pb-4 border-b">
                        <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">Security Event Alerts</p>
                                <p className="text-xs text-muted-foreground">Receive instant alerts on new sign-ins from unrecognized devices or location changes.</p>
                            </div>
                        </div>
                        <Checkbox
                            checked={settings.securityAlerts}
                            onCheckedChange={(c) => setSettings({ ...settings, securityAlerts: Boolean(c) })}
                        />
                    </div>

                    <div className="flex items-start justify-between gap-4 pb-4 border-b">
                        <div className="flex items-start gap-3">
                            <Bell className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">Patient & Clinical Alerts</p>
                                <p className="text-xs text-muted-foreground">Notify when patient test results or assigned shift changes are published.</p>
                            </div>
                        </div>
                        <Checkbox
                            checked={settings.patientUpdates}
                            onCheckedChange={(c) => setSettings({ ...settings, patientUpdates: Boolean(c) })}
                        />
                    </div>

                    <div className="flex items-start justify-between gap-4 pb-4 border-b">
                        <div className="flex items-start gap-3">
                            <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">SMS Emergency Broadcasts</p>
                                <p className="text-xs text-muted-foreground">Receive critical hospital emergency code alerts via SMS.</p>
                            </div>
                        </div>
                        <Checkbox
                            checked={settings.smsEmergency}
                            onCheckedChange={(c) => setSettings({ ...settings, smsEmergency: Boolean(c) })}
                        />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">Weekly Digest & Reports</p>
                                <p className="text-xs text-muted-foreground">Receive weekly overview summaries of clinical consults and activity.</p>
                            </div>
                        </div>
                        <Checkbox
                            checked={settings.weeklyDigest}
                            onCheckedChange={(c) => setSettings({ ...settings, weeklyDigest: Boolean(c) })}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button onClick={handleSave} className="gap-2 shadow-xs">
                        <Save className="h-4 w-4" />
                        <span>Save Preferences</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
