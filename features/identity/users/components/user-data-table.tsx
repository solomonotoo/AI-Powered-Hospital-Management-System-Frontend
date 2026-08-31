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
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, CheckCircle, XCircle, AlertCircle, Users } from 'lucide-react';
import { User, UserStatus } from '@/features/identity/users/types/user.types';
import { EmptyState } from '@/features/shared-features/empty-state';
import { DataTableFooter } from '@/features/shared-features/data-table-footer';
import { DataTableSortHeader } from '@/features/shared-features/data-table-sort-header';


interface UserDataTableProps {
    users: User[];
}

const getStatusIcon = (status: UserStatus) => {
    switch (status) {
        case UserStatus.ACTIVE:
            return <CheckCircle className="h-3 w-3 text-green-500" />;
        case UserStatus.INVITED:
            return <AlertCircle className="h-3 w-3 text-yellow-500" />;
        case UserStatus.LOCKED:
        case UserStatus.SUSPENDED:
            return <XCircle className="h-3 w-3 text-red-500" />;
        default:
            return null;
    }
};

export function UserDataTable({ users }: UserDataTableProps) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({
        field: 'name',
        direction: 'asc',
    });

    if (users.length === 0) {
        return (
            <EmptyState
                title="No users found"
                description="Try adjusting your search or filters to find what you're looking for."
                icon={Users}
            />
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <DataTableSortHeader
                                label="User"
                                field="name"
                                sort={sort}
                                onSortChange={setSort}
                            />
                        </TableHead>
                        <TableHead>
                            <DataTableSortHeader
                                label="Role"
                                field="role"
                                sort={sort}
                                onSortChange={setSort}
                            />
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>MFA</TableHead>
                        <TableHead>
                            <DataTableSortHeader
                                label="Last Login"
                                field="lastLogin"
                                sort={sort}
                                onSortChange={setSort}
                            />
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={`https://avatar.vercel.sh/${user.name}`} />
                                        <AvatarFallback>
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{user.role}</Badge>
                            </TableCell>
                            {/* <TableCell>
                                <div className="flex items-center gap-1">
                                    {getStatusIcon(user.status}
                                    <span className="capitalize">{user.status.toLowerCase()}</span>
                                </div>
                            </TableCell> */}
                            <TableCell>
                                {user.mfaEnabled ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                        Enabled
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                        Disabled
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {user.lastLogin ? '2 min ago' : 'Never'}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem>View Account</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Access</DropdownMenuItem>
                                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                        <DropdownMenuItem>Reset MFA</DropdownMenuItem>
                                        <DropdownMenuItem>Force Sign Out</DropdownMenuItem>
                                        <DropdownMenuSeparator className="border-destructive/50" />
                                        <DropdownMenuItem className="text-destructive">
                                            Suspend Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            Delete Account
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTableFooter
                page={page}
                pageSize={pageSize}
                totalRecords={users.length}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
}