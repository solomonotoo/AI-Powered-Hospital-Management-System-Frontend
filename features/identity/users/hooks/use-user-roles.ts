"use client";

import { useQuery } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userApi } from '../service/user-api';

export function useUserRoles(userId?: string) {
    return useQuery({
        queryKey: [...userKeys.all, 'user-roles', userId],
        queryFn: () => userApi.getUserRoles(userId || ''),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });
}