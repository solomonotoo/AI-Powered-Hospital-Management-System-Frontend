"use client";

import { useQuery } from '@tanstack/react-query';
import { UserFilters } from '../types/user-filters.types';
import { userService } from '../service/user-service';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
    roles: () => [...userKeys.all, 'roles'] as const,
    permissions: () => [...userKeys.all, 'permissions'] as const,
    sessions: (userId: string) => [...userKeys.all, 'sessions', userId] as const,
    activity: (userId: string) => [...userKeys.all, 'activity', userId] as const,
};

export function useUsers(filters: UserFilters) {
    return useQuery({
        queryKey: userKeys.list(filters),
        queryFn: () => userService.getUsers(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}