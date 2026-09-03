import { api } from "@/lib/axios";
import { PagedUsersResponse, UsersSummaryCardResponse  } from "../types/users";
import { API_ROUTES } from "@/lib/api-routes";
import { UsersQuery } from "../types/users-query";

// Notice the difference from your AuthService
// For the generated /api/v1/users operation, the OpenAPI response is directly:
// PagedResponseUserSummaryResponse
// not an ApiResponse<T> wrapper. So we should not add wrapper-unwrapping logic unless the actual runtime response proves otherwise.

class UsersService {
    async getUsersCardSummary(): Promise<UsersSummaryCardResponse> {
        const response = await api.get<UsersSummaryCardResponse>(
            API_ROUTES.USERS.SUMMARY
        );
        return response.data;
    }

    async getUsers(query: UsersQuery): Promise<PagedUsersResponse> {
        const response = await api.get<PagedUsersResponse>(
            API_ROUTES.USERS.ROOT,
            {
                params: query,
            }
        );

        return response.data;
    }


}

export const usersService = new UsersService();
