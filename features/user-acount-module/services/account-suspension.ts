import { API_ROUTES } from "@/lib/api-routes";
import { api } from "@/lib/axios";

class AccountSuspensionService {
  async suspendUser(userId: string, currentUserId?: string): Promise<void> {
    const response = await api.post(
      API_ROUTES.USERS.SUSPEND(userId),
      undefined,
      {
        params: currentUserId ? { currentUserId } : undefined,
      }
    );
    return response.data;
  }

  async reactivateUser(userId: string, currentUserId?: string): Promise<void> {
    const response = await api.post(
      API_ROUTES.USERS.REACTIVATE(userId),
      undefined,
      {
        params: currentUserId ? { currentUserId } : undefined,
      }
    );
    return response.data;
  }
}

export const accountSuspensionService = new AccountSuspensionService();