"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { userQueryKeys } from "../components/queries/user-access-query-keys";

export function useUser(userId: string) {
    return useQuery({
        queryKey: userQueryKeys.detail(userId),
        queryFn: async () => usersService.getUserById(userId),
        enabled:Boolean(userId),
    });
}