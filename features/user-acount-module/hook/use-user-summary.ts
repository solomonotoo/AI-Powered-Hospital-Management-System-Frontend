import { useQuery } from "@tanstack/react-query";
import { UsersSummaryCardResponse } from "../types/users";
import { usersService } from "../services/users.service";

export const userSummaryQueryKeys = {
    all: ["userSummary"] as const,
    lists: () => [...userSummaryQueryKeys.all, "list"] as const, 
}

export function useUserSummary() {
    return useQuery<UsersSummaryCardResponse>({
        queryKey: userSummaryQueryKeys.lists(),
        queryFn: () => usersService.getUsersCardSummary(),
    });
}