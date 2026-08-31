"use client";

import { useQuery } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userApi } from '../service/user-api';

export function useUserActivity(userId?: string) {
    return useQuery({
        queryKey: userKeys.activity(userId || ''),
        queryFn: () => userApi.getUserActivity(userId || ''),
        enabled: !!userId,
        staleTime: 2 * 60 * 1000,
    });
}