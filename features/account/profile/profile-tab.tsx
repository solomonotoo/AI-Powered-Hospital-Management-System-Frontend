"use client";

import React, { useState } from 'react';
import { ProfilePhotoUpload } from '../components/profile-photo-upload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export function ProfileTab() {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Mensah',
        email: 'john.mensah@hospital.com',
        phone: '+233 24 123 4567',
        specialization: 'Cardiology',
        department: 'Clinical Department',
        licenseNumber: 'MDC/P/2019/8492',
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Profile information saved successfully');
    };

    return (
        <div className="space-y-6">
            <ProfilePhotoUpload userName={`${formData.firstName} ${formData.lastName}`} />

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Personal & Professional Details</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Update your basic contact details and clinical profile info.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">First Name</label>
                            <Input
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Last Name</label>
                            <Input
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Work Email (Read-only)</label>
                            <Input value={formData.email} disabled className="bg-muted/50" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Phone Number</label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Specialization</label>
                            <Input
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Medical License Number</label>
                            <Input
                                value={formData.licenseNumber}
                                disabled
                                className="bg-muted/50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button type="submit" className="gap-2 shadow-xs">
                            <Save className="h-4 w-4" />
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
