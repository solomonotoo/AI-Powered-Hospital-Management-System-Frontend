"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userService } from '../service/user-service';

export function useUser(userId?: string) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: userKeys.detail(userId || ''),
        queryFn: () => userService.getUser(userId!),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });

    const invalidateUser = () => {
        if (userId) {
            queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        }
    };

    return {
        ...query,
        invalidateUser,
    };
}