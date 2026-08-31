"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '../types/user.types';
import { useRoles } from '../hooks/use-roles';
import { useUserRoles } from '../hooks/use-user-roles';
import { useUserMutations } from '../hooks/use-user-mutations';
import { Plus, Check, Minus, Eye, Stethoscope, Shield, Trash2 } from 'lucide-react';
import { SectionCard } from '@/features/shared-features/section-card';
import { toast } from 'sonner';

interface UserAccessTabProps {
    user: User;
}

export function UserAccessTab({ user }: UserAccessTabProps) {
    const { data: roles } = useRoles();
    const { data: userRoles } = useUserRoles(user.id);
    const { assignRole, revokeRole } = useUserMutations();

    const handleAssignRole = (roleId: string) => {
        assignRole.mutate({ userId: user.id, roleId });
    };

    const handleRevokeRole = (assignmentId: string) => {
        revokeRole.mutate({ userId: user.id, assignmentId });
    };

    return (
        <div className="space-y-6">
            {/* Primary Role */}
            <SectionCard title="Primary Role">
                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Stethoscope className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-base text-foreground">{user.role || 'Doctor'}</p>
                                    <Badge variant="secondary" className="text-xs">Primary</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Clinical access for patient consultations, visits and medical documentation
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => toast.info('Role change modal')}>
                            Change Role
                        </Button>
                    </div>
                </div>
            </SectionCard>

            {/* Additional Roles */}
            <SectionCard title="Additional Roles">
                <div className="space-y-3">
                    {userRoles && userRoles.length > 0 ? (
                        userRoles.map((assignment) => (
                            <div
                                key={assignment.assignmentId}
                                className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-xs"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-sm text-foreground">{assignment.roleId}</p>
                                        <Badge variant="outline" className="text-xs">{assignment.status || 'ACTIVE'}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Assigned: {new Date(assignment.assignedAt || Date.now()).toLocaleDateString()}
                                        {assignment.expiresAt && (
                                            <> • Expires: {new Date(assignment.expiresAt).toLocaleDateString()}</>
                                        )}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => handleRevokeRole(assignment.assignmentId || '')}
                                    disabled={revokeRole.isPending}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Revoke
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-6 border border-dashed rounded-xl text-sm text-muted-foreground">
                            No additional roles assigned to this account.
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="w-full gap-2 border-dashed"
                        onClick={() => toast.info('Add additional role modal')}
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Additional Role</span>
                    </Button>
                </div>
            </SectionCard>

            {/* Permission Summary */}
            <SectionCard title="Permission Summary">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="rounded-xl border p-4 bg-muted/20">
                            <h4 className="font-semibold text-sm text-foreground border-b pb-2">Patients</h4>
                            <div className="mt-3 space-y-2 text-xs">
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                    <Check className="h-3.5 w-3.5" />
                                    <span>View Patients</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Create Patient Records</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Edit Patient Info</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Minus className="h-3.5 w-3.5" />
                                    <span>Delete Patients</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border p-4 bg-muted/20">
                            <h4 className="font-semibold text-sm text-foreground border-b pb-2">Medical Records</h4>
                            <div className="mt-3 space-y-2 text-xs">
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                    <Check className="h-3.5 w-3.5" />
                                    <span>View Records</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Create Records</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Edit Diagnoses & Notes</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Minus className="h-3.5 w-3.5" />
                                    <span>Sign Discharge Documents</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border p-4 bg-muted/20">
                            <h4 className="font-semibold text-sm text-foreground border-b pb-2">Staff & System</h4>
                            <div className="mt-3 space-y-2 text-xs">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Minus className="h-3.5 w-3.5" />
                                    <span>View Staff Directory</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Minus className="h-3.5 w-3.5" />
                                    <span>Manage System Access</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Minus className="h-3.5 w-3.5" />
                                    <span>Manage Hospital Facilities</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2" onClick={() => toast.info('Full permissions matrix')}>
                        <Eye className="h-4 w-4" />
                        <span>View Full Permission Details</span>
                    </Button>
                </div>
            </SectionCard>
        </div>
    );
}