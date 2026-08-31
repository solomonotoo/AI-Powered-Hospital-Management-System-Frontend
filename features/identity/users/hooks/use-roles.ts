"use client";

import { useQuery } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userApi } from '../service/user-api';

export function useRoles() {
    return useQuery({
        queryKey: userKeys.roles(),
        queryFn: () => userApi.getRoles(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export function useRole(roleId?: string) {
    return useQuery({
        queryKey: [...userKeys.roles(), roleId],
        queryFn: () => userApi.getRole(roleId!),
        enabled: !!roleId,
        staleTime: 10 * 60 * 1000,
    });
}