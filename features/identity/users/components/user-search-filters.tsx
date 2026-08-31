
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserFilters } from '../types/user-filters.types';

interface UserToolbarProps {
    filters?: UserFilters;
    onFiltersChange?: (filters: Partial<UserFilters>) => void;
    onCreateUser?: () => void;
}

export function UserSearchFilters({
    filters,
    onFiltersChange,
    onCreateUser,
}: UserToolbarProps) {
    return (
        <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    value={filters?.search || ''}
                    onChange={(e) => onFiltersChange?.({ search: e.target.value })}
                    className="pl-9"
                />
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <Select
                    value={filters?.role || 'all'}
                    onValueChange={(val) => onFiltersChange?.({ role: val === 'all' ? undefined : val })}
                >
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                        <SelectItem value="NURSE">Nurse</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={filters?.status || 'all'}
                    onValueChange={(val) => onFiltersChange?.({ status: val === 'all' ? undefined : val })}
                >
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="locked">Locked</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={filters?.mfa === undefined ? 'all' : filters.mfa ? 'enabled' : 'disabled'}
                    onValueChange={(val) =>
                        onFiltersChange?.({
                            mfa: val === 'all' ? undefined : val === 'enabled',
                        })
                    }
                >
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="MFA" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All MFA</SelectItem>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                </Select>
                {onCreateUser && (
                    <Button onClick={onCreateUser} className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        <span>Add User</span>
                    </Button>
                )}
            </div>
        </div>
    );
}

export const UserToolbar = UserSearchFilters;