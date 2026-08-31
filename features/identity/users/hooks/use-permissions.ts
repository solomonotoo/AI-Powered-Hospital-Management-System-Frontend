"use client";

import { useQuery } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userApi } from '../service/user-api';

export function usePermissions() {
    return useQuery({
        queryKey: userKeys.permissions(),
        queryFn: () => userApi.getPermissions(),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
}