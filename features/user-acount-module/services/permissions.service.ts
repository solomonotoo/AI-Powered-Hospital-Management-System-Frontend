import { API_ROUTES } from "@/lib/api-routes";
import { api } from "@/lib/axios";
import { PermissionsResponse } from "../types/user-access.types";

class PermissionsService {
  async getPermissions(): Promise<PermissionsResponse[]> {
    const response = await api.get<PermissionsResponse[]>(
      API_ROUTES.PERMISSIONS.LIST
    );
    return response.data;
  }
}

export const permissionsService = new PermissionsService();
