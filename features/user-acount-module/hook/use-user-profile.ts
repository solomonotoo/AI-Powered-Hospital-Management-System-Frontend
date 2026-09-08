"use client";

import { api } from "@/lib/axios";
import { PagedUsersResponse, UserSummaryResponse } from "../types/users";
import { API_ROUTES } from "@/lib/api-routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "../components/queries/user-access-query-keys";
import { getCurrentUser } from "@/lib/auth";

// Fetch user profile from the backend users list
// Note: Backend requires sortBy to be one of ['loginemail', 'createdAt', 'lastLoginAt']
async function getUserFromUsersApi(userId: string): Promise<UserSummaryResponse | null> {
  if (!userId || !userId.trim()) return null;

  try {
    const listResponse = await api.get<PagedUsersResponse>(
      API_ROUTES.USERS.ROOT,
      {
        params: {
          page: 0,
          size: 50,
          sortBy: "createdAt",
          sortDir: "asc",
        },
      }
    );
    const listMatches = listResponse.data?.content ?? [];
    const foundUser = listMatches.find((user) => user.staffId === userId);
    if (foundUser) return foundUser;

    // Fallback: check if the user is the currently authenticated user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.staffId === userId) {
      return {
        staffId: currentUser.staffId,
        fullName: currentUser.fullName,
        loginEmail: "admin@hms.local",
        staffRole: currentUser.role,
        status: "ACTIVE",
        mustChangePassword: currentUser.mustChangePassword,
      };
    }

    return null;
  } catch (error) {
    console.error("Error retrieving user profile for ID:", userId, error);

    // Fallback for current logged-in user in case of backend request error
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.staffId === userId) {
      return {
        staffId: currentUser.staffId,
        fullName: currentUser.fullName,
        loginEmail: "admin@hms.local",
        staffRole: currentUser.role,
        status: "ACTIVE",
        mustChangePassword: currentUser.mustChangePassword,
      };
    }

    return null;
  }
}

export function useUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: userQueryKeys.detail(userId),
    queryFn: async () => {
      // 1. Check if user already exists in ANY cached user queries
      const cachedQueries = queryClient.getQueriesData<PagedUsersResponse>({
        queryKey: ["users"],
      });

      for (const [, queryData] of cachedQueries) {
        if (queryData?.content) {
          const match = queryData.content.find((u) => u.staffId === userId);
          if (match) return match;
        }
      }

      // 2. Fetch from backend API using required query params
      return getUserFromUsersApi(userId);
    },
    enabled: Boolean(userId && userId.trim().length > 0),
    staleTime: 30_000,
    retry: 1,
  });
}