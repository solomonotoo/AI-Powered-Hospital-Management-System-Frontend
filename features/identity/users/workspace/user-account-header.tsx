"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, ChevronDown, ArrowLeft, KeyRound, Smartphone, LogOut, Lock, UserX, Edit3 } from 'lucide-react';
import { User } from '../types/user.types';
import Link from 'next/link';
import { toast } from 'sonner';

interface UserAccountHeaderProps {
    user: User | null;
    isLoading?: boolean;
    onEditAccess?: () => void;
}

export function UserAccountHeader({ user, isLoading, onEditAccess }: UserAccountHeaderProps) {
    if (isLoading) {
        return <div className="h-28 animate-pulse rounded-xl bg-card border shadow-sm" />;
    }

    if (!user) {
        return null;
    }

    const isStatusActive = String(user.status).toLowerCase() === 'active';

    return (
        <div className="space-y-4">
            <Link
                href="/users"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>User Accounts</span>
            </Link>

            <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start sm:items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-border shadow-sm">
                        <AvatarImage src={user.photo || `https://avatar.vercel.sh/${user.name || user.id}`} />
                        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                            {(user.name || user.email || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h1 className="text-xl font-bold tracking-tight text-foreground">{user.name}</h1>
                            <Badge
                                variant="secondary"
                                className={
                                    isStatusActive
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 font-semibold text-xs'
                                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/60 font-semibold text-xs'
                                }
                            >
                                ● {String(user.status).toUpperCase()}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono bg-muted/60 px-1.5 py-0.5 rounded text-[11px] font-semibold">{user.id}</span>
                            <span>•</span>
                            <span>{user.role}</span>
                            {user.department && (
                                <>
                                    <span>•</span>
                                    <span>{user.department}</span>
                                </>
                            )}
                            <span>•</span>
                            <span>Clinical Department</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onEditAccess}
                        className="gap-2 shadow-xs"
                    >
                        <Edit3 className="h-4 w-4 text-muted-foreground" />
                        <span>Edit Access</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" size="sm" className="gap-2 shadow-xs">
                                <Shield className="h-4 w-4" />
                                <span>Security Actions</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                                onClick={() => toast.success(`Password reset email sent to ${user.email}`)}
                                className="gap-2"
                            >
                                <KeyRound className="h-4 w-4 text-muted-foreground" />
                                <span>Reset Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => toast.success(`MFA reset for ${user.name}`)}
                                className="gap-2"
                            >
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                <span>Reset MFA</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => toast.success(`All sessions terminated for ${user.name}`)}
                                className="gap-2"
                            >
                                <LogOut className="h-4 w-4 text-muted-foreground" />
                                <span>Force Sign Out</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => toast.warning(`Account locked for ${user.name}`)}
                                className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                                <Lock className="h-4 w-4" />
                                <span>Lock Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => toast.error(`Account suspended for ${user.name}`)}
                                className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                                <UserX className="h-4 w-4" />
                                <span>Suspend Account</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}