"use client";

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    MoreHorizontal,
    Eye,
    Shield,
    KeyRound,
    Smartphone,
    LogOut,
    UserX,
    Trash2,
} from 'lucide-react';
import { User } from '../types/user.types';

interface UserRowActionsProps {
    user: User;
    onAction?: (action: string, user: User) => void;
}

export function UserRowActions({ user, onAction }: UserRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => onAction?.('view', user)} className="gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>View Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('edit', user)} className="gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Edit Access</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('reset-password', user)} className="gap-2">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    <span>Reset Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('reset-mfa', user)} className="gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span>Reset MFA</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('force-signout', user)} className="gap-2">
                    <LogOut className="h-4 w-4 text-muted-foreground" />
                    <span>Force Sign Out</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={() => onAction?.('suspend', user)}
                >
                    <UserX className="h-4 w-4" />
                    <span>Suspend Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={() => onAction?.('delete', user)}
                >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Account</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
