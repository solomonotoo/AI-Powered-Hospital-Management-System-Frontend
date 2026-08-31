"use client";

import { useQuery } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userApi } from '../service/user-api';

export function useUserSessions(userId?: string) {
    return useQuery({
        queryKey: userKeys.sessions(userId || ''),
        queryFn: () => userApi.getUserSessions(userId || ''),
        enabled: !!userId,
        staleTime: 2 * 60 * 1000,
    });
}
