"use client";

import { api } from "@/lib/axios";
import { PagedUsersResponse, UserSummaryResponse } from "../types/users";
import { API_ROUTES } from "@/lib/api-routes";
import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "../components/queries/user-access-query-keys";


// Fetch user profile from the users API
async function getUserFromUsersApi(userId: string): Promise<UserSummaryResponse | null> {
    if (!userId || !userId.trim()) return null;

    try {
        // Attempt 1: Search users query by ID
        const searchResponse = await api.get<PagedUsersResponse>(
            API_ROUTES.USERS.ROOT,
            {
                params: {
                    search: userId,
                    page: 0,
                    size: 20,
                },
            }
        );
        const searchMatches = searchResponse.data.content ?? [];
        const foundUser = searchMatches.find((user) => user.staffId === userId);
        if (foundUser) return foundUser;

        // Attempt 2: Fallback to users list in case search does not match UUID directly
        const listResponse = await api.get<PagedUsersResponse>(
            API_ROUTES.USERS.ROOT,
            {
                params: {
                    page: 0,
                    size: 100,
                },
            }
        );
        const listMatches = listResponse.data.content ?? [];
        return listMatches.find((user) => user.staffId === userId) ?? null;
    } catch (error) {
        console.error("Error retrieving user profile for ID:", userId, error);
        return null;
    }
}

export function useUserProfile(userId: string) {
    return useQuery({
        queryKey: userQueryKeys.detail(userId),
        queryFn: async () => getUserFromUsersApi(userId),
        // Only run query when a non-empty userId string is provided
        enabled: Boolean(userId && userId.trim().length > 0),
        staleTime: 30_000,
        retry: 1,
    });
}