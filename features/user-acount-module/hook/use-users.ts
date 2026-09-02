import { useQuery } from "@tanstack/react-query";
import { UsersQuery } from "../types/users-query";
import { usersService } from "../services/users.service";

export const usersQueryKeys = {
    all: ["users"] as const,
    lists: () => [...usersQueryKeys.all, "list"] as const,

    list: (query: UsersQuery) => [...usersQueryKeys.lists(), query] as const,
};

export function useUsers(query: UsersQuery) {
    return useQuery({
        queryKey: usersQueryKeys.list(query),
        queryFn: () => usersService.getUsers(query),
    });
}