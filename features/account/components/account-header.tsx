"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit3, CheckCircle2 } from 'lucide-react';

interface AccountHeaderProps {
    user?: {
        name?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        role?: string;
        department?: string;
        photo?: string;
    };
    onEditProfile?: () => void;
}

export function AccountHeader({
    user = {
        name: 'Dr John Mensah',
        firstName: 'John',
        lastName: 'Mensah',
        email: 'john@hospital.com',
        phone: '+233 24 123 4567',
        role: 'Doctor',
        department: 'Clinical Department',
    },
    onEditProfile,
}: AccountHeaderProps) {
    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* User Info with Avatar */}
                <div className="flex items-center gap-4 md:border-r md:pr-6">
                    <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-sm">
                        <AvatarImage src={user.photo || `https://avatar.vercel.sh/${user.name}`} />
                        <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                            {(user.firstName?.[0] || 'J') + (user.lastName?.[0] || 'M')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                        <Badge variant="secondary" className="mt-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold text-[11px]">
                            ● Account Active
                        </Badge>
                    </div>
                </div>

                {/* Personal Information Grid */}
                <div className="md:col-span-2 flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>
                        {onEditProfile && (
                            <Button variant="outline" size="sm" onClick={onEditProfile} className="gap-1.5 text-xs">
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit Profile</span>
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="text-muted-foreground">First Name</span>
                            <p className="font-semibold text-foreground mt-0.5">{user.firstName || 'John'}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Last Name</span>
                            <p className="font-semibold text-foreground mt-0.5">{user.lastName || 'Mensah'}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Work Email</span>
                            <p className="font-semibold text-foreground mt-0.5 flex items-center gap-1.5">
                                <span>{user.email || 'john@hospital.com'}</span>
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            </p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Phone</span>
                            <p className="font-semibold text-foreground mt-0.5">{user.phone || '+233 24 123 4567'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
