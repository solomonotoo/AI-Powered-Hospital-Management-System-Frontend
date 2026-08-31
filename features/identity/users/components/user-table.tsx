"use client";

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Users } from 'lucide-react';
import { User, UserStatus } from '../types/user.types';
import { EmptyState } from '@/features/shared-features/empty-state';
import { DataTableFooter } from '@/features/shared-features/data-table-footer';
import { DataTableSortHeader } from '@/features/shared-features/data-table-sort-header';
import { UserRowActions } from './user-row-actions';

interface UserTableProps {
    users: User[];
    totalRecords?: number;
    isLoading?: boolean;
    onUserSelect?: (user: User) => void;
    onRowAction?: (action: string, user: User) => void;
}

const getStatusBadge = (status?: string | UserStatus) => {
    const s = String(status || '').toUpperCase();
    switch (s) {
        case 'ACTIVE':
        case UserStatus.ACTIVE:
            return (
                <div className="flex items-center gap-1.5 font-medium text-xs text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Active</span>
                </div>
            );
        case 'INVITED':
        case 'PENDING':
        case UserStatus.INVITED:
            return (
                <div className="flex items-center gap-1.5 font-medium text-xs text-amber-700 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>Invited</span>
                </div>
            );
        case 'LOCKED':
        case UserStatus.LOCKED:
            return (
                <div className="flex items-center gap-1.5 font-medium text-xs text-rose-700 dark:text-rose-400">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Locked</span>
                </div>
            );
        case 'SUSPENDED':
        case 'EXPIRED':
        case 'REVOKED':
        case UserStatus.SUSPENDED:
            return (
                <div className="flex items-center gap-1.5 font-medium text-xs text-rose-700 dark:text-rose-400">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Suspended</span>
                </div>
            );
        default:
            return <span className="capitalize text-xs text-muted-foreground">{String(status || 'unknown')}</span>;
    }
};

export function UserTable({
    users,
    totalRecords,
    isLoading,
    onUserSelect,
    onRowAction,
}: UserTableProps) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({
        field: 'name',
        direction: 'asc',
    });

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-3">
                    <div className="h-10 animate-pulse rounded-lg bg-muted" />
                    <div className="h-14 animate-pulse rounded-lg bg-muted/60" />
                    <div className="h-14 animate-pulse rounded-lg bg-muted/60" />
                    <div className="h-14 animate-pulse rounded-lg bg-muted/60" />
                    <div className="h-14 animate-pulse rounded-lg bg-muted/60" />
                </div>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="rounded-xl border bg-card p-8 shadow-sm">
                <EmptyState
                    title="No user accounts found"
                    description="Try adjusting your search query, status or role filters."
                    icon={Users}
                />
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow>
                        <TableHead className="w-[300px]">
                            <DataTableSortHeader
                                label="USER"
                                field="name"
                                sort={sort}
                                onSortChange={setSort}
                            />
                        </TableHead>
                        <TableHead>
                            <DataTableSortHeader
                                label="ROLE"
                                field="role"
                                sort={sort}
                                onSortChange={setSort}
                            />
                        </TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>MFA</TableHead>
                        <TableHead>
                            <DataTableSortHeader
                                label="LAST LOGIN"
                                field="lastLogin"
                                sort={sort}
                                onSortChange={setSort}
                            />
                        </TableHead>
                        <TableHead className="text-right w-[80px]">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            className={`transition-colors hover:bg-muted/50 ${
                                onUserSelect ? 'cursor-pointer' : ''
                            }`}
                            onClick={() => onUserSelect?.(user)}
                        >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border border-border">
                                        <AvatarImage src={user.photo || `https://avatar.vercel.sh/${user.name || user.id}`} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                            {(user.name || user.email || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm leading-tight hover:text-primary transition-colors">
                                            {user.name || 'Unnamed User'}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {user.email || user.id}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-medium text-xs">
                                    {user.role || 'User'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {getStatusBadge(user.status)}
                            </TableCell>
                            <TableCell>
                                {user.mfaEnabled ? (
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/50 text-[11px] font-medium">
                                        ● Enabled
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-muted text-muted-foreground text-[11px] font-medium">
                                        ○ Disabled
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                                {user.lastLogin ? '2 min ago' : 'Never'}
                            </TableCell>
                            <TableCell className="text-right">
                                <UserRowActions user={user} onAction={onRowAction} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTableFooter
                page={page}
                pageSize={pageSize}
                totalRecords={totalRecords ?? users.length}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
}

export const UserDataTable = UserTable;
